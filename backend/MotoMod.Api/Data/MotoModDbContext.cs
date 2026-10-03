using Microsoft.EntityFrameworkCore;

namespace MotoMod.Api.Data;

public sealed class MotoModDbContext(DbContextOptions<MotoModDbContext> options) : DbContext(options)
{
    public DbSet<AppUser> Users => Set<AppUser>();
    public DbSet<BikeEntity> Bikes => Set<BikeEntity>();
    public DbSet<PartEntity> Parts => Set<PartEntity>();
    public DbSet<PartFitment> PartFitments => Set<PartFitment>();
    public DbSet<SavedPlan> SavedPlans => Set<SavedPlan>();
    public DbSet<ServiceProvider> ServiceProviders => Set<ServiceProvider>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>().ToTable("Users");
        modelBuilder.Entity<AppUser>().HasIndex(x => x.Email).IsUnique();
        modelBuilder.Entity<BikeEntity>().ToTable("Bikes");
        modelBuilder.Entity<BikeEntity>().HasIndex(x => new { x.Brand, x.Model, x.ModelYear }).IsUnique();
        modelBuilder.Entity<BikeEntity>().Property(x => x.PowerBhp).HasPrecision(6, 2);
        modelBuilder.Entity<BikeEntity>().Property(x => x.TorqueNm).HasPrecision(6, 2);
        modelBuilder.Entity<BikeEntity>().Property(x => x.WeightKg).HasPrecision(6, 2);
        modelBuilder.Entity<PartEntity>().ToTable("Parts");
        modelBuilder.Entity<PartEntity>().Property(x => x.Price).HasPrecision(12, 2);
        modelBuilder.Entity<PartEntity>().Property(x => x.PowerGainBhp).HasPrecision(6, 2);
        modelBuilder.Entity<PartEntity>().Property(x => x.WeightChangeKg).HasPrecision(6, 2);
        modelBuilder.Entity<PartFitment>().ToTable("PartFitments").HasKey(x => new { x.PartId, x.BikeId });
        modelBuilder.Entity<PartFitment>().HasOne(x => x.Part).WithMany(x => x.Fitments).HasForeignKey(x => x.PartId);
        modelBuilder.Entity<PartFitment>().HasOne(x => x.Bike).WithMany().HasForeignKey(x => x.BikeId);
        modelBuilder.Entity<SavedPlan>().ToTable("SavedPlans");
        modelBuilder.Entity<SavedPlan>().Property(x => x.TotalCost).HasPrecision(12, 2);
        modelBuilder.Entity<ServiceProvider>().ToTable("ServiceProviders");
        modelBuilder.Entity<ServiceProvider>().Property(x => x.Rating).HasPrecision(3, 2);
    }
}

public sealed class AppUser { public Guid Id { get; set; } public string Email { get; set; } = ""; public string DisplayName { get; set; } = ""; public string PasswordHash { get; set; } = ""; public string Role { get; set; } = "MEMBER"; public DateTime CreatedAt { get; set; } }
public sealed class BikeEntity { public int Id { get; set; } public string Brand { get; set; } = ""; public string Model { get; set; } = ""; public short ModelYear { get; set; } public string Style { get; set; } = ""; public decimal PowerBhp { get; set; } public decimal? TorqueNm { get; set; } public decimal WeightKg { get; set; } public string? ImageUrl { get; set; } public string? SourceUrl { get; set; } public string? ImageCredit { get; set; } public string SpecsJson { get; set; } = "{}"; }
public sealed class PartEntity { public int Id { get; set; } public string Brand { get; set; } = ""; public string Name { get; set; } = ""; public string Category { get; set; } = ""; public decimal Price { get; set; } public decimal PowerGainBhp { get; set; } public decimal WeightChangeKg { get; set; } public string? ImageUrl { get; set; } public string? SourceUrl { get; set; } public string? ImageCredit { get; set; } public string ConfigJson { get; set; } = "{}"; public ICollection<PartFitment> Fitments { get; set; } = []; }
public sealed class PartFitment { public int PartId { get; set; } public PartEntity Part { get; set; } = null!; public int BikeId { get; set; } public BikeEntity Bike { get; set; } = null!; }
public sealed class SavedPlan { public Guid Id { get; set; } public Guid UserId { get; set; } public int BikeId { get; set; } public string Name { get; set; } = ""; public string Status { get; set; } = "DRAFT"; public string? Prompt { get; set; } public string ConfigJson { get; set; } = "{}"; public decimal TotalCost { get; set; } public DateTime CreatedAt { get; set; } public DateTime UpdatedAt { get; set; } }
public sealed class ServiceProvider { public Guid Id { get; set; } public string Name { get; set; } = ""; public string City { get; set; } = ""; public decimal? Rating { get; set; } public bool IsVerified { get; set; } public string SpecialtiesJson { get; set; } = "[]"; }
