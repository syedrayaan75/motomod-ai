import fs from 'fs';
import path from 'path';

// Generate clean local SVG/PNG studio images for all 43 bikes in public/bikes/
const publicBikesDir = path.join(process.cwd(), 'public', 'bikes');
if (!fs.existsSync(publicBikesDir)) {
  fs.mkdirSync(publicBikesDir, { recursive: true });
}

const ALL_LOCAL_BIKES = [
  { key: 'hunter350', name: 'Hunter 350', brand: 'Royal Enfield', color: '#FF5500' },
  { key: 'classic350', name: 'Classic 350', brand: 'Royal Enfield', color: '#DC2626' },
  { key: 'bullet350', name: 'Bullet 350', brand: 'Royal Enfield', color: '#D4AF37' },
  { key: 'meteor350', name: 'Meteor 350', brand: 'Royal Enfield', color: '#D97706' },
  { key: 'gt650', name: 'Continental GT 650', brand: 'Royal Enfield', color: '#DC2626' },
  { key: 'interceptor650', name: 'Interceptor 650', brand: 'Royal Enfield', color: '#EA580C' },
  { key: 'himalayan452', name: 'Himalayan 452', brand: 'Royal Enfield', color: '#0284C7' },
  { key: 'himalayan', name: 'Himalayan', brand: 'Royal Enfield', color: '#0284C7' },
  { key: 'guerrilla450', name: 'Guerrilla 450', brand: 'Royal Enfield', color: '#EAB308' },
  { key: 'shotgun650', name: 'Shotgun 650', brand: 'Royal Enfield', color: '#15803D' },
  { key: 'supermeteor650', name: 'Super Meteor 650', brand: 'Royal Enfield', color: '#BE123C' },

  { key: 'duke390', name: 'Duke 390', brand: 'KTM', color: '#FF5500' },
  { key: 'duke250', name: 'Duke 250', brand: 'KTM', color: '#FF5500' },
  { key: 'duke200', name: 'Duke 200', brand: 'KTM', color: '#FF5500' },
  { key: 'rc390', name: 'RC 390', brand: 'KTM', color: '#FF5500' },
  { key: 'rc200', name: 'RC 200', brand: 'KTM', color: '#FF5500' },
  { key: 'adv390', name: '390 Adventure', brand: 'KTM', color: '#FF5500' },
  { key: 'adv250', name: '250 Adventure', brand: 'KTM', color: '#FF5500' },

  { key: 'cb300r', name: 'CB300R', brand: 'Honda', color: '#334155' },
  { key: 'cb350hness', name: "CB350 H'ness", brand: 'Honda', color: '#991B1B' },
  { key: 'cb350rs', name: 'CB350RS', brand: 'Honda', color: '#DC2626' },
  { key: 'nx500', name: 'NX500', brand: 'Honda', color: '#B91C1C' },
  { key: 'cbr650r', name: 'CBR650R', brand: 'Honda', color: '#E60012' },

  { key: 'dominar400', name: 'Dominar 400', brand: 'Bajaj', color: '#15803D' },
  { key: 'ns400z', name: 'Pulsar NS400Z', brand: 'Bajaj', color: '#B91C1C' },
  { key: 'ns200', name: 'Pulsar NS200', brand: 'Bajaj', color: '#0F172A' },
  { key: 'n250', name: 'Pulsar N250', brand: 'Bajaj', color: '#1D4ED8' },

  { key: 'mt15', name: 'MT-15 V2', brand: 'Yamaha', color: '#0284C7' },
  { key: 'r15v4', name: 'R15 V4', brand: 'Yamaha', color: '#1D4ED8' },
  { key: 'mt03', name: 'MT-03', brand: 'Yamaha', color: '#06B6D4' },

  { key: 'apacherr310', name: 'Apache RR 310', brand: 'TVS', color: '#DC2626' },
  { key: 'apachertr310', name: 'Apache RTR 310', brand: 'TVS', color: '#EAB308' },
  { key: 'ronin225', name: 'Ronin 225', brand: 'TVS', color: '#EA580C' },

  { key: 'ninja400', name: 'Ninja 400', brand: 'Kawasaki', color: '#65A30D' },
  { key: 'z900', name: 'Z900', brand: 'Kawasaki', color: '#65A30D' },
  { key: 'zx4rr', name: 'Ninja ZX-4RR', brand: 'Kawasaki', color: '#65A30D' },

  { key: 'g310r', name: 'G 310 R', brand: 'BMW', color: '#0284C7' },
  { key: 'g310gs', name: 'G 310 GS', brand: 'BMW', color: '#0284C7' },
  { key: 's1000rr', name: 'S 1000 RR', brand: 'BMW', color: '#0284C7' },

  { key: 'speed400', name: 'Speed 400', brand: 'Triumph', color: '#991B1B' },
  { key: 'scrambler400x', name: 'Scrambler 400X', brand: 'Triumph', color: '#3F6212' },
  { key: 'streettriple', name: 'Street Triple 765 R', brand: 'Triumph', color: '#64748B' },

  { key: 'x440', name: 'X440', brand: 'Harley-Davidson', color: '#EA580C' },
  { key: 'nightster', name: 'Nightster 975', brand: 'Harley-Davidson', color: '#0F172A' }
];

function generateSvg(b) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">
  <rect width="600" height="360" fill="#0A0E1A" />
  <ellipse cx="300" cy="300" rx="220" ry="18" fill="#000000" opacity="0.8" />
  <g transform="translate(40, 20)">
    <!-- Wheels -->
    <circle cx="110" cy="210" r="58" fill="none" stroke="#1E293B" stroke-width="20" />
    <circle cx="110" cy="210" r="48" fill="none" stroke="${b.color}" stroke-width="3" />
    <circle cx="410" cy="210" r="58" fill="none" stroke="#1E293B" stroke-width="20" />
    <circle cx="410" cy="210" r="48" fill="none" stroke="${b.color}" stroke-width="3" />
    <!-- Engine & Body -->
    <rect x="200" y="160" width="130" height="80" rx="8" fill="#151D2A" stroke="#334155" stroke-width="2" />
    <path d="M 120 210 L 180 120 L 320 85 L 375 140 L 310 220 Z" fill="${b.color}" opacity="0.9" />
    <line x1="410" y1="210" x2="360" y2="60" stroke="#E2E8F0" stroke-width="8" stroke-linecap="round" />
    <circle cx="360" cy="60" r="12" fill="${b.color}" />
  </g>
  <text x="300" y="45" font-family="sans-serif" font-weight="bold" font-size="20" fill="${b.color}" text-anchor="middle">${b.brand.toUpperCase()}</text>
  <text x="300" y="75" font-family="sans-serif" font-weight="bold" font-size="24" fill="#FFFFFF" text-anchor="middle">${b.name}</text>
</svg>`;
}

ALL_LOCAL_BIKES.forEach(b => {
  const filePathSvg = path.join(publicBikesDir, `${b.key}.svg`);
  const filePathJpg = path.join(publicBikesDir, `${b.key}.jpg`);
  const svgContent = generateSvg(b);
  fs.writeFileSync(filePathSvg, svgContent, 'utf-8');
  // Copy to .jpg extension so Vite serves /bikes/<key>.jpg smoothly
  fs.writeFileSync(filePathJpg, svgContent, 'utf-8');
});

console.log(`Generated ${ALL_LOCAL_BIKES.length} local bike images in public/bikes/!`);
