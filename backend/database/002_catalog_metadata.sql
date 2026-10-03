/* Safe upgrade for existing MotoMod databases. Does not delete project data. */
IF COL_LENGTH('dbo.Bikes', 'ImageUrl') IS NULL ALTER TABLE dbo.Bikes ADD ImageUrl NVARCHAR(1000) NULL;
IF COL_LENGTH('dbo.Bikes', 'SourceUrl') IS NULL ALTER TABLE dbo.Bikes ADD SourceUrl NVARCHAR(1000) NULL;
IF COL_LENGTH('dbo.Bikes', 'ImageCredit') IS NULL ALTER TABLE dbo.Bikes ADD ImageCredit NVARCHAR(500) NULL;

IF COL_LENGTH('dbo.Parts', 'ImageUrl') IS NULL ALTER TABLE dbo.Parts ADD ImageUrl NVARCHAR(1000) NULL;
IF COL_LENGTH('dbo.Parts', 'SourceUrl') IS NULL ALTER TABLE dbo.Parts ADD SourceUrl NVARCHAR(1000) NULL;
IF COL_LENGTH('dbo.Parts', 'ImageCredit') IS NULL ALTER TABLE dbo.Parts ADD ImageCredit NVARCHAR(500) NULL;
