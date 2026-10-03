/* 
  MotoMod AI — SQL Server Seed Script for 10 Real Motorcycle Brands & Equipment Parts
  Run this in SSMS against the MotoMod database.
*/

USE MotoMod;
GO

-- CLEAR EXISTING SEED DATA
DELETE FROM dbo.PartFitments;
DELETE FROM dbo.Parts;
DELETE FROM dbo.Bikes;
GO

-- 1. INSERT 10 REAL BRANDS & BIKES
INSERT INTO dbo.Bikes (Brand, Model, ModelYear, Style, PowerBhp, TorqueNm, WeightKg, ImageUrl, SpecsJson) VALUES
-- ROYAL ENFIELD
('Royal Enfield', 'Hunter 350', 2024, 'Cafe · Tracker', 20.20, 27.00, 181.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":349,"seatHeightMm":800,"fuelEconomyKmL":36}'),
('Royal Enfield', 'Classic 350', 2024, 'Bobber · Brat', 20.20, 27.00, 195.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":349,"seatHeightMm":805,"fuelEconomyKmL":37}'),
('Royal Enfield', 'Meteor 350', 2024, 'Scrambler · ADV', 20.20, 27.00, 191.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":349,"seatHeightMm":765,"fuelEconomyKmL":38}'),
('Royal Enfield', 'Continental GT 650', 2024, 'Cafe Racer', 47.00, 52.00, 214.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":648,"seatHeightMm":804,"fuelEconomyKmL":25}'),
('Royal Enfield', 'Himalayan 452', 2024, 'ADV Tourer', 40.00, 40.00, 196.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":452,"seatHeightMm":825,"fuelEconomyKmL":30}'),

-- KTM
('KTM', 'Duke 390', 2024, 'Street Fighter', 45.30, 39.00, 168.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":399,"seatHeightMm":820,"fuelEconomyKmL":28}'),
('KTM', 'RC 390', 2024, 'Track Sport', 43.50, 37.00, 172.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":373,"seatHeightMm":835,"fuelEconomyKmL":27}'),

-- HONDA
('Honda', 'CB300R', 2024, 'Neo Retro · Cafe', 30.70, 27.50, 146.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":286,"seatHeightMm":801,"fuelEconomyKmL":32}'),
('Honda', 'CB350 H''ness', 2024, 'Modern Classic', 21.00, 30.00, 181.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":348,"seatHeightMm":800,"fuelEconomyKmL":35}'),

-- BAJAJ
('Bajaj', 'Dominar 400', 2024, 'Sports Tourer', 40.00, 35.00, 193.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":373,"seatHeightMm":800,"fuelEconomyKmL":29}'),
('Bajaj', 'Pulsar NS400Z', 2024, 'Naked Street', 40.00, 35.00, 174.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":373,"seatHeightMm":807,"fuelEconomyKmL":29}'),

-- YAMAHA
('Yamaha', 'MT-15 V2', 2024, 'Hyper Naked', 18.40, 14.10, 141.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":155,"seatHeightMm":810,"fuelEconomyKmL":45}'),
('Yamaha', 'R15 V4', 2024, 'Super Sport', 18.40, 14.20, 142.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":155,"seatHeightMm":815,"fuelEconomyKmL":43}'),

-- TVS
('TVS', 'Apache RR 310', 2024, 'Racing Sport', 34.00, 27.30, 174.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":312,"seatHeightMm":810,"fuelEconomyKmL":30}'),
('TVS', 'Ronin 225', 2024, 'Scrambler Dual', 20.40, 19.93, 160.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":225,"seatHeightMm":795,"fuelEconomyKmL":40}'),

-- KAWASAKI
('Kawasaki', 'Ninja 400', 2024, 'Sport Custom', 45.00, 37.00, 168.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":399,"seatHeightMm":785,"fuelEconomyKmL":26}'),
('Kawasaki', 'Z900', 2024, 'Supernaked', 125.00, 98.60, 212.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":948,"seatHeightMm":820,"fuelEconomyKmL":18}'),

-- BMW
('BMW', 'G 310 R', 2024, 'Roadster', 34.00, 28.00, 164.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":313,"seatHeightMm":785,"fuelEconomyKmL":30}'),
('BMW', 'S 1000 RR', 2024, 'Superbike', 210.00, 113.00, 197.00, 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80', '{"engineCc":999,"seatHeightMm":824,"fuelEconomyKmL":15}'),

-- TRIUMPH
('Triumph', 'Speed 400', 2024, 'Modern Roadster', 40.00, 37.50, 176.00, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":398,"seatHeightMm":790,"fuelEconomyKmL":29}'),
('Triumph', 'Scrambler 400X', 2024, 'Scrambler', 40.00, 37.50, 179.00, 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80', '{"engineCc":398,"seatHeightMm":835,"fuelEconomyKmL":28}'),

-- HARLEY-DAVIDSON
('Harley-Davidson', 'X440', 2024, 'Neo Roadster', 27.00, 38.00, 190.50, 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80', '{"engineCc":440,"seatHeightMm":805,"fuelEconomyKmL":32}');
GO

-- 2. INSERT REAL AFTERMARKET EQUIPMENT PARTS
INSERT INTO dbo.Parts (Brand, Name, Category, Price, PowerGainBhp, WeightChangeKg, ConfigJson) VALUES
('Red Rooster', 'Performance Shorty Slip-On', 'EXHAUST', 14500.00, 1.60, -2.10, '{"difficulty":"Hard / Expert","heatIncrease":true,"ecuRemapRequired":true}'),
('Akrapovič', 'Carbon Full System Race Exhaust', 'EXHAUST', 85000.00, 4.80, -4.50, '{"difficulty":"Hard / Expert","heatIncrease":true,"ecuRemapRequired":true}'),
('Yoshimura', 'R-77 Carbon Muffler', 'EXHAUST', 42000.00, 3.20, -3.10, '{"difficulty":"Hard / Expert","heatIncrease":true,"ecuRemapRequired":true}'),
('Powertronic', 'Stage 1 Piggyback ECU', 'ENGINE', 18500.00, 2.40, 0.00, '{"difficulty":"Medium","heatIncrease":true,"ecuRemapRequired":true}'),
('BMC Filters', 'High-Performance Air Filter', 'ENGINE', 6500.00, 0.80, -0.20, '{"difficulty":"Easy","heatIncrease":false,"ecuRemapRequired":false}'),
('Öhlins', 'NIX 22 Cartridge Fork Kit', 'SUSP.', 95000.00, 0.00, -1.20, '{"difficulty":"Hard / Expert","heatIncrease":false,"ecuRemapRequired":false}'),
('YSS', 'G-Top Gas Monoshock Absorber', 'SUSP.', 28000.00, 0.00, -0.80, '{"difficulty":"Medium","heatIncrease":false,"ecuRemapRequired":false}'),
('AutoLogue Design', 'Fender Eliminator / Tail Tidy', 'BODY', 2800.00, 0.00, -1.20, '{"difficulty":"Easy","heatIncrease":false,"ecuRemapRequired":false}'),
('Woodcraft', 'GP Billet Clip-On Handlebars', 'BODY', 14000.00, 0.00, -0.50, '{"difficulty":"Medium","heatIncrease":false,"ecuRemapRequired":false}'),
('Lumen', '5.75" 6000K LED Halo Projector', 'LIGHTS', 3500.00, 0.00, -0.30, '{"difficulty":"Easy","heatIncrease":false,"ecuRemapRequired":false}'),
('Brembo', 'RCS 19 Corsa Corta Radial Master Cylinder', 'BRAKES', 34000.00, 0.00, -0.40, '{"difficulty":"Medium","heatIncrease":false,"ecuRemapRequired":false}'),
('HEL Performance', 'Steel Braided Brake Lines Set', 'BRAKES', 7500.00, 0.00, -0.10, '{"difficulty":"Medium","heatIncrease":false,"ecuRemapRequired":false}');
GO
