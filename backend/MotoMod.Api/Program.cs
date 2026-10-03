using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MotoMod.Api.Data;

var builder = WebApplication.CreateBuilder(args);
var jwtKey = builder.Configuration["Jwt:Key"] ?? throw new InvalidOperationException("JWT key is not configured.");
builder.Services.AddOpenApi();
builder.Services.AddDbContext<MotoModDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("MotoMod")));
builder.Services.AddScoped<IPasswordHasher<AppUser>, PasswordHasher<AppUser>>();
builder.Services.AddCors(options => options.AddPolicy("MotoModClient", policy => policy.WithOrigins("http://localhost:5173").AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuer = true, ValidIssuer = builder.Configuration["Jwt:Issuer"], ValidateAudience = true, ValidAudience = builder.Configuration["Jwt:Audience"],
    ValidateIssuerSigningKey = true, IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)), ValidateLifetime = true, ClockSkew = TimeSpan.FromMinutes(1)
});
builder.Services.AddAuthorization();
builder.Services.AddRateLimiter(options => options.AddFixedWindowLimiter("ai", limiter => { limiter.PermitLimit = 8; limiter.Window = TimeSpan.FromMinutes(1); }));

var app = builder.Build();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.UseHttpsRedirection();
app.UseCors("MotoModClient");
app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

await ApplyCatalogSchemaAsync(app.Services);
await SeedDatabase(app.Services);

app.MapGet("/api/health", async (MotoModDbContext db, CancellationToken ct) => Results.Ok(new { status = "healthy", database = await db.Database.CanConnectAsync(ct) ? "connected" : "unavailable", utc = DateTime.UtcNow }));
app.MapGet("/api/bikes", async (string? brand, MotoModDbContext db, CancellationToken ct) => Results.Ok(await db.Bikes.AsNoTracking().Where(b => brand == null || b.Brand == brand).OrderBy(b => b.Brand).ThenBy(b => b.Model).Select(b => new { b.Id, b.Brand, b.Model, Year = b.ModelYear, b.Style, b.PowerBhp, b.WeightKg, b.ImageUrl }).ToListAsync(ct)));
app.MapGet("/api/bikes/{id:int}", async (int id, MotoModDbContext db, CancellationToken ct) => await db.Bikes.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id, ct) is { } bike ? Results.Ok(bike) : Results.NotFound());
app.MapGet("/api/parts", async (int? bikeId, string? category, MotoModDbContext db, CancellationToken ct) =>
{
    var query = db.Parts.AsNoTracking().AsQueryable();
    if (bikeId.HasValue) query = query.Where(p => p.Fitments.Any(f => f.BikeId == bikeId));
    if (!string.IsNullOrWhiteSpace(category)) query = query.Where(p => p.Category == category);
    return Results.Ok(await query.OrderBy(p => p.Category).Select(p => new { p.Id, p.Brand, p.Name, p.Category, p.Price, p.PowerGainBhp, p.WeightChangeKg, p.ImageUrl }).ToListAsync(ct));
});
app.MapPost("/api/auth/register", async (RegisterRequest request, MotoModDbContext db, IPasswordHasher<AppUser> hasher, CancellationToken ct) =>
{
    var email = request.Email.Trim().ToLowerInvariant();
    if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(email) || request.Password.Length < 8) return Results.BadRequest(new { message = "Name, a valid email, and an 8+ character password are required." });
    if (await db.Users.AnyAsync(x => x.Email == email, ct)) return Results.Conflict(new { message = "An account already exists for that email." });
    var user = new AppUser { Id = Guid.NewGuid(), DisplayName = request.Name.Trim(), Email = email, Role = "CREATOR", CreatedAt = DateTime.UtcNow };
    user.PasswordHash = hasher.HashPassword(user, request.Password);
    db.Users.Add(user); await db.SaveChangesAsync(ct);
    return Results.Created($"/api/users/{user.Id}", new { token = IssueToken(user, builder.Configuration), user = new { user.Id, user.DisplayName, user.Email, user.Role } });
});
app.MapPost("/api/auth/login", async (LoginRequest request, MotoModDbContext db, IPasswordHasher<AppUser> hasher, CancellationToken ct) =>
{
    var user = await db.Users.SingleOrDefaultAsync(x => x.Email == request.Email.Trim().ToLowerInvariant(), ct);
    if (user is null || hasher.VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed) return Results.Unauthorized();
    return Results.Ok(new { token = IssueToken(user, builder.Configuration), user = new { user.Id, user.DisplayName, user.Email, user.Role } });
});
app.MapPost("/api/builds/compile", async (CompileBuildRequest request, ClaimsPrincipal principal, MotoModDbContext db, CancellationToken ct) =>
{
    var userIdValue = principal.FindFirstValue(ClaimTypes.NameIdentifier);
    if (!Guid.TryParse(userIdValue, out var userId)) return Results.Unauthorized();
    var bike = await db.Bikes.FindAsync([request.BikeId], ct);
    if (bike is null) return Results.BadRequest(new { message = "The selected chassis does not exist." });
    var selected = await db.Parts.Where(p => request.PartIds.Contains(p.Id)).Include(p => p.Fitments).ToListAsync(ct);
    if (selected.Count != request.PartIds.Distinct().Count()) return Results.BadRequest(new { message = "One or more selected components do not exist." });
    var invalid = selected.FirstOrDefault(p => p.Fitments.All(f => f.BikeId != bike.Id));
    if (invalid is not null) return Results.BadRequest(new { message = $"{invalid.Name} does not fit the selected chassis." });
    var total = selected.Sum(x => x.Price);
    var plan = new SavedPlan { Id = Guid.NewGuid(), UserId = userId, BikeId = bike.Id, Name = string.IsNullOrWhiteSpace(request.Name) ? "Untitled blueprint" : request.Name.Trim(), Prompt = request.Prompt.Trim(), Status = "COMPILED", ConfigJson = System.Text.Json.JsonSerializer.Serialize(new { request.PartIds }), TotalCost = total, CreatedAt = DateTime.UtcNow, UpdatedAt = DateTime.UtcNow };
    db.SavedPlans.Add(plan); await db.SaveChangesAsync(ct);
    return Results.Created($"/api/builds/{plan.Id}", new { id = plan.Id, compatibility = "validated", projectedPower = bike.PowerBhp + selected.Sum(p => p.PowerGainBhp), projectedWeight = bike.WeightKg + selected.Sum(p => p.WeightChangeKg), totalCost = total });
}).RequireAuthorization().RequireRateLimiting("ai");
app.MapGet("/api/builds/mine", async (ClaimsPrincipal principal, MotoModDbContext db, CancellationToken ct) =>
{
    if (!Guid.TryParse(principal.FindFirstValue(ClaimTypes.NameIdentifier), out var userId)) return Results.Unauthorized();
    var plans = await (from plan in db.SavedPlans.AsNoTracking()
                       join bike in db.Bikes.AsNoTracking() on plan.BikeId equals bike.Id
                       where plan.UserId == userId
                       orderby plan.UpdatedAt descending
                       select new { plan.Id, plan.Name, plan.Status, plan.TotalCost, plan.UpdatedAt, Bike = $"{bike.Brand} {bike.Model}", bike.ModelYear, bike.ImageUrl }).ToListAsync(ct);
    return Results.Ok(plans);
}).RequireAuthorization();
app.MapGet("/api/builds/{id:guid}", async (Guid id, ClaimsPrincipal principal, MotoModDbContext db, CancellationToken ct) =>
{
    if (!Guid.TryParse(principal.FindFirstValue(ClaimTypes.NameIdentifier), out var userId)) return Results.Unauthorized();
    var plan = await db.SavedPlans.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id && p.UserId == userId, ct);
    if (plan is null) return Results.NotFound();
    var bike = await db.Bikes.AsNoTracking().FirstAsync(b => b.Id == plan.BikeId, ct);
    var partIds = System.Text.Json.JsonSerializer.Deserialize<System.Text.Json.Nodes.JsonObject>(plan.ConfigJson)?["PartIds"]?.AsArray().Select(n => n.GetValue<int>()).ToArray() ?? [];
    return Results.Ok(new { plan.Id, plan.Name, plan.Prompt, plan.BikeId, Bike = bike, PartIds = partIds });
}).RequireAuthorization();
app.MapGet("/api/providers", async (MotoModDbContext db, CancellationToken ct) => Results.Ok(await db.ServiceProviders.AsNoTracking().OrderByDescending(x => x.Rating).ToListAsync(ct)));

app.Run();

static string IssueToken(AppUser user, IConfiguration configuration)
{
    var claims = new[] { new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), new Claim(ClaimTypes.Email, user.Email), new Claim(ClaimTypes.Role, user.Role) };
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
    return new JwtSecurityTokenHandler().WriteToken(new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddHours(2), signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)));
}
static async Task ApplyCatalogSchemaAsync(IServiceProvider services)
{
    using var scope = services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<MotoModDbContext>();
    // This is intentionally idempotent: existing student accounts and saved builds remain untouched.
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Bikes', 'ImageUrl') IS NULL ALTER TABLE dbo.Bikes ADD ImageUrl NVARCHAR(1000) NULL;");
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Bikes', 'SourceUrl') IS NULL ALTER TABLE dbo.Bikes ADD SourceUrl NVARCHAR(1000) NULL;");
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Bikes', 'ImageCredit') IS NULL ALTER TABLE dbo.Bikes ADD ImageCredit NVARCHAR(500) NULL;");
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Parts', 'ImageUrl') IS NULL ALTER TABLE dbo.Parts ADD ImageUrl NVARCHAR(1000) NULL;");
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Parts', 'SourceUrl') IS NULL ALTER TABLE dbo.Parts ADD SourceUrl NVARCHAR(1000) NULL;");
    await db.Database.ExecuteSqlRawAsync("IF COL_LENGTH('dbo.Parts', 'ImageCredit') IS NULL ALTER TABLE dbo.Parts ADD ImageCredit NVARCHAR(500) NULL;");
}

static async Task SeedDatabase(IServiceProvider services)
{
    using var scope = services.CreateScope(); var db = scope.ServiceProvider.GetRequiredService<MotoModDbContext>();
    const string source = "https://www.bikewale.com/";
    var catalog = new[] {
        ("Yamaha", "MT-15 V2", 2024, "Naked", 18.4m, 14.1m, 141m), ("Yamaha", "YZF-R15 V4", 2024, "Sport", 18.4m, 14.2m, 142m), ("Yamaha", "FZ-X", 2024, "Neo-retro", 12.2m, 13.3m, 139m),
        ("Honda", "CB350RS", 2024, "Roadster", 20.8m, 30m, 179m), ("Honda", "H'ness CB350", 2024, "Classic", 20.8m, 30m, 181m), ("Honda", "NX500", 2024, "Adventure", 47m, 43m, 196m),
        ("Kawasaki", "Ninja 300", 2024, "Sport", 39m, 26.1m, 179m), ("Kawasaki", "Ninja 650", 2024, "Sport", 68m, 64m, 196m), ("Kawasaki", "Z900", 2024, "Supernaked", 123m, 98.6m, 212m),
        ("Suzuki", "Gixxer 250", 2024, "Naked", 26.1m, 22.2m, 156m), ("Suzuki", "V-Strom SX", 2024, "Adventure", 26.5m, 22.2m, 167m), ("Suzuki", "Hayabusa", 2024, "Sport Tourer", 187m, 150m, 264m),
        ("KTM", "200 Duke", 2024, "Naked", 25m, 19.3m, 159m), ("KTM", "390 Duke", 2024, "Naked", 45.3m, 39m, 168m), ("KTM", "RC 390", 2024, "Sport", 43.5m, 37m, 172m),
        ("Triumph", "Speed 400", 2024, "Roadster", 39.5m, 37.5m, 176m), ("Triumph", "Scrambler 400 X", 2024, "Scrambler", 39.5m, 37.5m, 179m), ("Triumph", "Street Triple 765 RS", 2024, "Streetfighter", 128m, 80m, 188m),
        ("Ducati", "Scrambler Icon", 2024, "Scrambler", 73m, 65m, 185m), ("Ducati", "Monster", 2024, "Naked", 111m, 93m, 188m), ("Ducati", "Panigale V4", 2024, "Sport", 216m, 124m, 191m),
        ("BMW", "G 310 R", 2024, "Roadster", 34m, 28m, 158.5m), ("BMW", "G 310 GS", 2024, "Adventure", 34m, 28m, 175m), ("BMW", "S 1000 RR", 2024, "Sport", 206.5m, 113m, 197m),
        ("Royal Enfield", "Classic 350", 2024, "Classic", 20.2m, 27m, 195m), ("Royal Enfield", "Himalayan 450", 2024, "Adventure", 39.5m, 40m, 196m), ("Royal Enfield", "Interceptor 650", 2024, "Roadster", 47m, 52m, 218m),
        ("Harley-Davidson", "X440", 2024, "Roadster", 27m, 38m, 190.5m), ("Harley-Davidson", "Nightster", 2024, "Cruiser", 89m, 95m, 218m), ("Harley-Davidson", "Sportster S", 2024, "Cruiser", 121m, 127m, 228m)
    };
    foreach (var item in catalog)
        if (!await db.Bikes.AnyAsync(b => b.Brand == item.Item1 && b.Model == item.Item2 && b.ModelYear == item.Item3))
            db.Bikes.Add(new BikeEntity { Brand = item.Item1, Model = item.Item2, ModelYear = (short)item.Item3, Style = item.Item4, PowerBhp = item.Item5, TorqueNm = item.Item6, WeightKg = item.Item7, SourceUrl = source, ImageCredit = "Specifications compiled from public India-market references; verify before purchase.", SpecsJson = "{\"market\":\"India\",\"dataStatus\":\"catalog-starter\"}" });
    await db.SaveChangesAsync();

    var starterParts = new[] {
        ("MotoMod", "Stainless Steel Crash Guard", "Protection", 3900m, 0m, 2.1m), ("MotoMod", "Adjustable Brake & Clutch Levers", "Controls", 2800m, 0m, 0.2m),
        ("MotoMod", "LED Auxiliary Light Pair", "Lighting", 3200m, 0m, 0.4m), ("MotoMod", "Performance Air Filter", "Engine", 2100m, 1.2m, -0.1m),
        ("MotoMod", "Chain & Sprocket Kit", "Drivetrain", 4600m, 0m, 0m), ("MotoMod", "Premium Sintered Brake Pad Set", "Brakes", 2500m, 0m, 0m),
        ("MotoMod", "Rear Paddock Spool Set", "Accessories", 900m, 0m, 0.1m), ("MotoMod", "USB-C Handlebar Charger", "Electronics", 1450m, 0m, 0.1m),
        ("MotoMod", "Touring Windscreen", "Bodywork", 3600m, 0m, 0.6m), ("MotoMod", "Universal Slip-on Exhaust", "Exhaust", 8500m, 2m, -1.8m)
    };
    var allBikes = await db.Bikes.ToListAsync();
    foreach (var item in starterParts)
    {
        var part = await db.Parts.FirstOrDefaultAsync(p => p.Brand == item.Item1 && p.Name == item.Item2);
        if (part is null) { part = new PartEntity { Brand = item.Item1, Name = item.Item2, Category = item.Item3, Price = item.Item4, PowerGainBhp = item.Item5, WeightChangeKg = item.Item6, SourceUrl = source, ImageCredit = "Starter catalog item — fitment requires workshop validation.", ConfigJson = "{\"fitmentStatus\":\"verification-required\",\"market\":\"India\"}" }; db.Parts.Add(part); await db.SaveChangesAsync(); }
        var fitted = await db.PartFitments.Where(f => f.PartId == part.Id).Select(f => f.BikeId).ToListAsync();
        db.PartFitments.AddRange(allBikes.Where(b => !fitted.Contains(b.Id)).Select(b => new PartFitment { PartId = part.Id, BikeId = b.Id }));
    }
    if (!await db.ServiceProviders.AnyAsync()) db.ServiceProviders.AddRange(new MotoMod.Api.Data.ServiceProvider { Id=Guid.NewGuid(), Name="Torque Lab Customs", City="Bengaluru", Rating=4.9m, IsVerified=true, SpecialtiesJson="[\"Performance tuning\",\"Fabrication\"]" }, new MotoMod.Api.Data.ServiceProvider { Id=Guid.NewGuid(), Name="The Moto Clinic", City="Bengaluru", Rating=4.8m, IsVerified=true, SpecialtiesJson="[\"Suspension\",\"Diagnostics\"]" });
    await db.SaveChangesAsync();
}
record RegisterRequest(string Name, string Email, string Password);
record LoginRequest(string Email, string Password);
record CompileBuildRequest(int BikeId, int[] PartIds, string Prompt, string? Name);
