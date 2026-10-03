# MotoMod AI

React + ASP.NET Core foundation for the MotoMod AI motorcycle customization platform.

## Run locally

1. Start the API: `cd backend/MotoMod.Api; dotnet run`
2. Start the web app: `cd frontend; npm run dev`
3. Open the Vite URL (normally `http://localhost:5173`).

The current API is an in-memory development implementation with typed endpoints, compatibility validation, rate limiting, and sample data. It is deliberately usable without SQL while the UI is being reviewed.

## SQL Server setup

Create an empty database named `MotoMod`, then run [001_initial_schema.sql](backend/database/001_initial_schema.sql) in SQL Server Management Studio. The development connection string is in `backend/MotoMod.Api/appsettings.Development.json` and uses Windows authentication. Change it only if your SQL Server instance is named or uses SQL login credentials.

Before production, replace in-memory storage with EF Core/ASP.NET Identity, move all secrets to user secrets or Key Vault, configure a real Claude API key, and enable the TDE procedure included at the bottom of the SQL script.
# motomod-ai
