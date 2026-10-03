import fs from 'fs';
import path from 'path';
import { renderCatalogSvg } from './renderBikeCatalogItem.js';

const FULL_43_CATALOG = [
  // Royal Enfield
  { key: 'hunter350', brand: 'Royal Enfield', model: 'Hunter 350', price: '₹ 1.50 - 1.75 Lakh', category: 'CAFE_RACER', engineCc: 349, powerBhp: 20.2, torqueNm: 27.0, weightKg: 181, mileage: 36, seatHeight: 800, primaryColor: '#FF6B00', secondaryColor: '#1E293B', accentColor: '#00E5FF' },
  { key: 'classic350', brand: 'Royal Enfield', model: 'Classic 350', price: '₹ 1.93 - 2.25 Lakh', category: 'CRUISER', engineCc: 349, powerBhp: 20.2, torqueNm: 27.0, weightKg: 195, mileage: 37, seatHeight: 805, primaryColor: '#B91C1C', secondaryColor: '#C0C0C0', accentColor: '#F59E0B' },
  { key: 'bullet350', brand: 'Royal Enfield', model: 'Bullet 350', price: '₹ 1.74 - 2.16 Lakh', category: 'CRUISER', engineCc: 349, powerBhp: 20.2, torqueNm: 27.0, weightKg: 195, mileage: 37, seatHeight: 805, primaryColor: '#0F172A', secondaryColor: '#D4AF37', accentColor: '#38BDF8' },
  { key: 'meteor350', brand: 'Royal Enfield', model: 'Meteor 350', price: '₹ 2.06 - 2.30 Lakh', category: 'CRUISER', engineCc: 349, powerBhp: 20.2, torqueNm: 27.0, weightKg: 191, mileage: 35, seatHeight: 765, primaryColor: '#D97706', secondaryColor: '#1E293B', accentColor: '#10B981' },
  { key: 'gt650', brand: 'Royal Enfield', model: 'Continental GT 650', price: '₹ 3.19 - 3.45 Lakh', category: 'CAFE_RACER', engineCc: 648, powerBhp: 47.0, torqueNm: 52.0, weightKg: 214, mileage: 25, seatHeight: 804, primaryColor: '#DC2626', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'interceptor650', brand: 'Royal Enfield', model: 'Interceptor 650', price: '₹ 3.03 - 3.31 Lakh', category: 'ROADSTER', engineCc: 648, powerBhp: 47.0, torqueNm: 52.0, weightKg: 217, mileage: 25, seatHeight: 804, primaryColor: '#EA580C', secondaryColor: '#E2E8F0', accentColor: '#34D399' },
  { key: 'himalayan452', brand: 'Royal Enfield', model: 'Himalayan 452', price: '₹ 2.85 - 2.98 Lakh', category: 'ADV', engineCc: 452, powerBhp: 40.0, torqueNm: 40.0, weightKg: 196, mileage: 30, seatHeight: 825, primaryColor: '#0284C7', secondaryColor: '#475569', accentColor: '#FBBF24' },
  { key: 'guerrilla450', brand: 'Royal Enfield', model: 'Guerrilla 450', price: '₹ 2.39 - 2.54 Lakh', category: 'ROADSTER', engineCc: 452, powerBhp: 40.0, torqueNm: 40.0, weightKg: 185, mileage: 31, seatHeight: 780, primaryColor: '#EAB308', secondaryColor: '#18181B', accentColor: '#38BDF8' },
  { key: 'shotgun650', brand: 'Royal Enfield', model: 'Shotgun 650', price: '₹ 3.59 - 3.73 Lakh', category: 'CRUISER', engineCc: 648, powerBhp: 47.0, torqueNm: 52.3, weightKg: 240, mileage: 24, seatHeight: 795, primaryColor: '#15803D', secondaryColor: '#27272A', accentColor: '#F43F5E' },
  { key: 'supermeteor650', brand: 'Royal Enfield', model: 'Super Meteor 650', price: '₹ 3.64 - 3.94 Lakh', category: 'CRUISER', engineCc: 648, powerBhp: 47.0, torqueNm: 52.3, weightKg: 241, mileage: 25, seatHeight: 740, primaryColor: '#BE123C', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },

  // KTM
  { key: 'duke390', brand: 'KTM', model: 'Duke 390', price: '₹ 3.11 Lakh', category: 'ROADSTER', engineCc: 399, powerBhp: 45.3, torqueNm: 39.0, weightKg: 168, mileage: 28, seatHeight: 820, primaryColor: '#FF5500', secondaryColor: '#18181B', accentColor: '#00E5FF' },
  { key: 'duke250', brand: 'KTM', model: 'Duke 250', price: '₹ 2.39 Lakh', category: 'ROADSTER', engineCc: 249, powerBhp: 31.0, torqueNm: 25.0, weightKg: 163, mileage: 32, seatHeight: 820, primaryColor: '#FF5500', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'duke200', brand: 'KTM', model: 'Duke 200', price: '₹ 1.97 Lakh', category: 'ROADSTER', engineCc: 199, powerBhp: 25.0, torqueNm: 19.3, weightKg: 159, mileage: 35, seatHeight: 822, primaryColor: '#FF5500', secondaryColor: '#27272A', accentColor: '#A855F7' },
  { key: 'rc390', brand: 'KTM', model: 'RC 390', price: '₹ 3.18 Lakh', category: 'SUPERSPORT', engineCc: 373, powerBhp: 43.5, torqueNm: 37.0, weightKg: 172, mileage: 27, seatHeight: 835, primaryColor: '#FF5500', secondaryColor: '#0F172A', accentColor: '#22C55E' },
  { key: 'rc200', brand: 'KTM', model: 'RC 200', price: '₹ 2.18 Lakh', category: 'SUPERSPORT', engineCc: 199, powerBhp: 25.0, torqueNm: 19.2, weightKg: 160, mileage: 34, seatHeight: 835, primaryColor: '#FF5500', secondaryColor: '#334155', accentColor: '#38BDF8' },
  { key: 'adv390', brand: 'KTM', model: '390 Adventure', price: '₹ 3.39 Lakh', category: 'ADV', engineCc: 373, powerBhp: 43.5, torqueNm: 37.0, weightKg: 177, mileage: 28, seatHeight: 855, primaryColor: '#FF5500', secondaryColor: '#475569', accentColor: '#F59E0B' },
  { key: 'adv250', brand: 'KTM', model: '250 Adventure', price: '₹ 2.48 Lakh', category: 'ADV', engineCc: 248, powerBhp: 30.0, torqueNm: 24.0, weightKg: 177, mileage: 32, seatHeight: 855, primaryColor: '#FF5500', secondaryColor: '#1E293B', accentColor: '#10B981' },

  // Honda
  { key: 'cb300r', brand: 'Honda', model: 'CB300R', price: '₹ 2.40 Lakh', category: 'CAFE_RACER', engineCc: 286, powerBhp: 30.7, torqueNm: 27.5, weightKg: 146, mileage: 32, seatHeight: 801, primaryColor: '#334155', secondaryColor: '#DAA520', accentColor: '#38BDF8' },
  { key: 'cb350hness', brand: 'Honda', model: "CB350 H'ness", price: '₹ 2.10 Lakh', category: 'CRUISER', engineCc: 348, powerBhp: 21.0, torqueNm: 30.0, weightKg: 181, mileage: 35, seatHeight: 800, primaryColor: '#991B1B', secondaryColor: '#E2E8F0', accentColor: '#F59E0B' },
  { key: 'cb350rs', brand: 'Honda', model: 'CB350RS', price: '₹ 2.15 Lakh', category: 'ROADSTER', engineCc: 348, powerBhp: 21.0, torqueNm: 30.0, weightKg: 179, mileage: 35, seatHeight: 800, primaryColor: '#DC2626', secondaryColor: '#18181B', accentColor: '#10B981' },
  { key: 'nx500', brand: 'Honda', model: 'NX500', price: '₹ 5.90 Lakh', category: 'ADV', engineCc: 471, powerBhp: 47.0, torqueNm: 43.0, weightKg: 196, mileage: 28, seatHeight: 830, primaryColor: '#B91C1C', secondaryColor: '#1E293B', accentColor: '#38BDF8' },
  { key: 'cbr650r', brand: 'Honda', model: 'CBR650R', price: '₹ 9.35 Lakh', category: 'SUPERSPORT', engineCc: 649, powerBhp: 87.0, torqueNm: 57.5, weightKg: 211, mileage: 20, seatHeight: 810, primaryColor: '#E60012', secondaryColor: '#0F172A', accentColor: '#F59E0B' },

  // Bajaj
  { key: 'dominar400', brand: 'Bajaj', model: 'Dominar 400', price: '₹ 2.30 Lakh', category: 'ADV', engineCc: 373, powerBhp: 40.0, torqueNm: 35.0, weightKg: 193, mileage: 29, seatHeight: 800, primaryColor: '#15803D', secondaryColor: '#1E293B', accentColor: '#38BDF8' },
  { key: 'ns400z', brand: 'Bajaj', model: 'Pulsar NS400Z', price: '₹ 1.85 Lakh', category: 'ROADSTER', engineCc: 373, powerBhp: 40.0, torqueNm: 35.0, weightKg: 174, mileage: 29, seatHeight: 807, primaryColor: '#B91C1C', secondaryColor: '#DAA520', accentColor: '#00E5FF' },
  { key: 'ns200', brand: 'Bajaj', model: 'Pulsar NS200', price: '₹ 1.58 Lakh', category: 'ROADSTER', engineCc: 199, powerBhp: 24.5, torqueNm: 18.7, weightKg: 158, mileage: 36, seatHeight: 805, primaryColor: '#0F172A', secondaryColor: '#E2E8F0', accentColor: '#34D399' },
  { key: 'n250', brand: 'Bajaj', model: 'Pulsar N250', price: '₹ 1.51 Lakh', category: 'ROADSTER', engineCc: 249, powerBhp: 24.5, torqueNm: 21.5, weightKg: 164, mileage: 35, seatHeight: 795, primaryColor: '#1D4ED8', secondaryColor: '#1E293B', accentColor: '#F59E0B' },

  // Yamaha
  { key: 'mt15', brand: 'Yamaha', model: 'MT-15 V2', price: '₹ 1.68 Lakh', category: 'ROADSTER', engineCc: 155, powerBhp: 18.4, torqueNm: 14.1, weightKg: 141, mileage: 45, seatHeight: 810, primaryColor: '#0284C7', secondaryColor: '#18181B', accentColor: '#00E5FF' },
  { key: 'r15v4', brand: 'Yamaha', model: 'R15 V4', price: '₹ 1.82 Lakh', category: 'SUPERSPORT', engineCc: 155, powerBhp: 18.4, torqueNm: 14.2, weightKg: 142, mileage: 43, seatHeight: 815, primaryColor: '#1D4ED8', secondaryColor: '#DAA520', accentColor: '#22C55E' },
  { key: 'mt03', brand: 'Yamaha', model: 'MT-03', price: '₹ 4.60 Lakh', category: 'ROADSTER', engineCc: 321, powerBhp: 42.0, torqueNm: 29.5, weightKg: 167, mileage: 28, seatHeight: 780, primaryColor: '#06B6D4', secondaryColor: '#1E293B', accentColor: '#F43F5E' },

  // TVS
  { key: 'apacherr310', brand: 'TVS', model: 'Apache RR 310', price: '₹ 2.72 Lakh', category: 'SUPERSPORT', engineCc: 312, powerBhp: 34.0, torqueNm: 27.3, weightKg: 174, mileage: 30, seatHeight: 810, primaryColor: '#DC2626', secondaryColor: '#0F172A', accentColor: '#FBBF24' },
  { key: 'apachertr310', brand: 'TVS', model: 'Apache RTR 310', price: '₹ 2.43 Lakh', category: 'ROADSTER', engineCc: 312, powerBhp: 35.6, torqueNm: 28.7, weightKg: 169, mileage: 30, seatHeight: 800, primaryColor: '#EAB308', secondaryColor: '#18181B', accentColor: '#38BDF8' },
  { key: 'ronin225', brand: 'TVS', model: 'Ronin 225', price: '₹ 1.49 Lakh', category: 'ROADSTER', engineCc: 225, powerBhp: 20.4, torqueNm: 19.93, weightKg: 160, mileage: 40, seatHeight: 795, primaryColor: '#EA580C', secondaryColor: '#1E293B', accentColor: '#34D399' },

  // Kawasaki
  { key: 'ninja400', brand: 'Kawasaki', model: 'Ninja 400', price: '₹ 5.24 Lakh', category: 'SUPERSPORT', engineCc: 399, powerBhp: 45.0, torqueNm: 37.0, weightKg: 168, mileage: 26, seatHeight: 785, primaryColor: '#65A30D', secondaryColor: '#0F172A', accentColor: '#38BDF8' },
  { key: 'z900', brand: 'Kawasaki', model: 'Z900', price: '₹ 9.30 Lakh', category: 'ROADSTER', engineCc: 948, powerBhp: 125.0, torqueNm: 98.6, weightKg: 212, mileage: 18, seatHeight: 820, primaryColor: '#65A30D', secondaryColor: '#18181B', accentColor: '#F43F5E' },
  { key: 'zx4rr', brand: 'Kawasaki', model: 'Ninja ZX-4RR', price: '₹ 9.10 Lakh', category: 'SUPERSPORT', engineCc: 399, powerBhp: 77.0, torqueNm: 39.0, weightKg: 189, mileage: 22, seatHeight: 800, primaryColor: '#65A30D', secondaryColor: '#0F172A', accentColor: '#FBBF24' },

  // BMW
  { key: 'g310r', brand: 'BMW', model: 'G 310 R', price: '₹ 2.90 Lakh', category: 'ROADSTER', engineCc: 313, powerBhp: 34.0, torqueNm: 28.0, weightKg: 164, mileage: 30, seatHeight: 785, primaryColor: '#0284C7', secondaryColor: '#DC2626', accentColor: '#E2E8F0' },
  { key: 'g310gs', brand: 'BMW', model: 'G 310 GS', price: '₹ 3.30 Lakh', category: 'ADV', engineCc: 313, powerBhp: 34.0, torqueNm: 28.0, weightKg: 175, mileage: 29, seatHeight: 835, primaryColor: '#0284C7', secondaryColor: '#EA580C', accentColor: '#FBBF24' },
  { key: 's1000rr', brand: 'BMW', model: 'S 1000 RR', price: '₹ 20.75 Lakh', category: 'SUPERSPORT', engineCc: 999, powerBhp: 210.0, torqueNm: 113.0, weightKg: 197, mileage: 15, seatHeight: 824, primaryColor: '#0284C7', secondaryColor: '#DC2626', accentColor: '#FFFFFF' },

  // Triumph
  { key: 'speed400', brand: 'Triumph', model: 'Speed 400', price: '₹ 2.40 Lakh', category: 'ROADSTER', engineCc: 398, powerBhp: 40.0, torqueNm: 37.5, weightKg: 176, mileage: 29, seatHeight: 790, primaryColor: '#991B1B', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'scrambler400x', brand: 'Triumph', model: 'Scrambler 400X', price: '₹ 2.64 Lakh', category: 'ADV', engineCc: 398, powerBhp: 40.0, torqueNm: 37.5, weightKg: 179, mileage: 28, seatHeight: 835, primaryColor: '#3F6212', secondaryColor: '#E2E8F0', accentColor: '#F59E0B' },
  { key: 'streettriple', brand: 'Triumph', model: 'Street Triple 765 R', price: '₹ 10.17 Lakh', category: 'ROADSTER', engineCc: 765, powerBhp: 120.0, torqueNm: 80.0, weightKg: 189, mileage: 19, seatHeight: 826, primaryColor: '#64748B', secondaryColor: '#DC2626', accentColor: '#00E5FF' },

  // Harley-Davidson
  { key: 'x440', brand: 'Harley-Davidson', model: 'X440', price: '₹ 2.39 Lakh', category: 'CRUISER', engineCc: 440, powerBhp: 27.0, torqueNm: 38.0, weightKg: 190.5, mileage: 32, seatHeight: 805, primaryColor: '#18181B', secondaryColor: '#EA580C', accentColor: '#FBBF24' },
  { key: 'nightster', brand: 'Harley-Davidson', model: 'Nightster 975', price: '₹ 13.49 Lakh', category: 'CRUISER', engineCc: 975, powerBhp: 89.0, torqueNm: 95.0, weightKg: 221, mileage: 18, seatHeight: 705, primaryColor: '#0F172A', secondaryColor: '#64748B', accentColor: '#F59E0B' }
];

const publicBikesDir = path.join(process.cwd(), 'public', 'bikes');
if (!fs.existsSync(publicBikesDir)) fs.mkdirSync(publicBikesDir, { recursive: true });

FULL_43_CATALOG.forEach(bike => {
  const svgData = renderCatalogSvg(bike);
  fs.writeFileSync(path.join(publicBikesDir, `${bike.key}.svg`), svgData, 'utf-8');
});

console.log(`Successfully generated verified catalog SVG assets for all ${FULL_43_CATALOG.length} motorcycle models!`);
