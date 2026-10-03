import fs from 'fs';
import path from 'path';

// Generate exact side-profile studio bike cutouts like BikeWale app
export function generateBikeWaleCutoutSvg(bike) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090E17" />
      <stop offset="100%" stop-color="#0D1424" />
    </linearGradient>

    <linearGradient id="tankGrad" x1="0%" y1="0%" x2="100%" y2="50%">
      <stop offset="0%" stop-color="${bike.primaryColor}" />
      <stop offset="100%" stop-color="${bike.secondaryColor}" />
    </linearGradient>

    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#000000" flood-opacity="0.8" />
    </filter>
    
    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Studio Transparent Dark Canvas -->
  <rect width="600" height="360" fill="url(#bgGrad)" />

  <!-- Studio Floor Ground Shadow -->
  <ellipse cx="300" cy="305" rx="230" ry="20" fill="#000000" opacity="0.8" />

  <!-- SIDE PROFILE CUTOUT OF MOTORCYCLE (BikeWale Studio Style) -->
  <g transform="translate(40, 20)" filter="url(#softShadow)">

    <!-- REAR WHEEL -->
    <g transform="translate(110, 210)">
      <!-- Outer Rubber Tire -->
      <circle cx="0" cy="0" r="62" fill="none" stroke="#151A24" stroke-width="22" />
      <circle cx="0" cy="0" r="70" fill="none" stroke="#0B0F19" stroke-width="2" />
      <!-- Rim Accent Ring -->
      <circle cx="0" cy="0" r="51" fill="none" stroke="${bike.primaryColor}" stroke-width="2.5" />
      <!-- Brake Disc -->
      <circle cx="0" cy="0" r="32" fill="#1E293B" stroke="#475569" stroke-width="2" stroke-dasharray="6 3" />
      <!-- Alloy Spokes -->
      <line x1="-45" y1="0" x2="45" y2="0" stroke="#334155" stroke-width="3" />
      <line x1="0" y1="-45" x2="0" y2="45" stroke="#334155" stroke-width="3" />
      <line x1="-30" y1="-30" x2="30" y2="30" stroke="#334155" stroke-width="2" />
      <line x1="-30" y1="30" x2="30" y2="-30" stroke="#334155" stroke-width="2" />
      <!-- Center Hub -->
      <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="${bike.accentColor}" stroke-width="2" />
    </g>

    <!-- FRONT WHEEL -->
    <g transform="translate(410, 210)">
      <!-- Outer Rubber Tire -->
      <circle cx="0" cy="0" r="62" fill="none" stroke="#151A24" stroke-width="22" />
      <circle cx="0" cy="0" r="70" fill="none" stroke="#0B0F19" stroke-width="2" />
      <!-- Rim Accent Ring -->
      <circle cx="0" cy="0" r="51" fill="none" stroke="${bike.primaryColor}" stroke-width="2.5" />
      <!-- Front Brake Rotor & Caliper -->
      <circle cx="0" cy="0" r="36" fill="#1E293B" stroke="#64748B" stroke-width="3" stroke-dasharray="8 4" />
      <rect x="20" y="-18" width="16" height="26" rx="3" fill="${bike.accentColor}" />
      <!-- Alloy Spokes -->
      <line x1="-45" y1="0" x2="45" y2="0" stroke="#334155" stroke-width="3" />
      <line x1="0" y1="-45" x2="0" y2="45" stroke="#334155" stroke-width="3" />
      <line x1="-30" y1="-30" x2="30" y2="30" stroke="#334155" stroke-width="2" />
      <line x1="-30" y1="30" x2="30" y2="-30" stroke="#334155" stroke-width="2" />
      <!-- Center Hub -->
      <circle cx="0" cy="0" r="14" fill="#0F172A" stroke="${bike.accentColor}" stroke-width="2" />
    </g>

    <!-- SWINGARM & REAR SUSPENSION -->
    <path d="M 110 210 L 220 180 M 110 210 L 210 210" stroke="#334155" stroke-width="6" stroke-linecap="round" />
    <line x1="140" y1="195" x2="185" y2="135" stroke="${bike.accentColor}" stroke-width="6" stroke-linecap="round" />

    <!-- ENGINE BLOCK & CARTER -->
    <rect x="200" y="160" width="130" height="80" rx="10" fill="#1E293B" stroke="#475569" stroke-width="2" />
    <path d="M 220 175 L 310 175 M 220 195 L 310 195 M 220 215 L 310 215" stroke="${bike.primaryColor}" stroke-width="2.5" opacity="0.8" />
    <circle cx="280" cy="200" r="18" fill="#0F172A" stroke="${bike.secondaryColor}" stroke-width="2" />

    <!-- EXHAUST PIPE -->
    <path d="M 250 220 L 360 230 L 420 210" fill="none" stroke="${bike.secondaryColor}" stroke-width="10" stroke-linecap="round" />

    <!-- FRONT FORKS -->
    <line x1="410" y1="210" x2="360" y2="60" stroke="${bike.secondaryColor}" stroke-width="9" stroke-linecap="round" />
    <line x1="400" y1="210" x2="350" y2="60" stroke="#475569" stroke-width="5" stroke-linecap="round" />

    <!-- TANK & BODYWORK CUTOUT (Tailored per bike category) -->
    ${
      bike.category === 'SUPERSPORT'
        ? `<path d="M 120 210 L 180 110 L 340 80 L 410 140 L 340 220 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="340,80 400,45 425,100 370,130" fill="${bike.primaryColor}" />`
        : bike.category === 'ADV'
        ? `<path d="M 110 210 L 170 120 L 330 65 L 390 120 L 320 220 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="330,65 375,15 395,85 350,110" fill="${bike.primaryColor}" />`
        : bike.category === 'CRUISER'
        ? `<path d="M 100 210 L 180 150 L 320 95 L 360 150 L 300 220 Z" fill="url(#tankGrad)" opacity="0.95" />
           <path d="M 230 100 C 280 80, 330 110, 320 150 Z" fill="${bike.primaryColor}" />`
        : `<path d="M 120 210 L 180 125 L 320 85 L 375 140 L 310 220 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="230,95 310,80 330,120 240,130" fill="${bike.primaryColor}" />`
    }

    <!-- HEADLIGHT & HANDLEBAR -->
    <circle cx="360" cy="60" r="14" fill="${bike.primaryColor}" filter="url(#neonGlow)" />
    <circle cx="360" cy="60" r="9" fill="#FFFFFF" opacity="0.95" />
    <line x1="335" y1="52" x2="375" y2="52" stroke="#F8FAFC" stroke-width="6" stroke-linecap="round" />
  </g>
</svg>`;
}

const ALL_BIKEWALE_SPECS = [
  // Royal Enfield
  { key: 'hunter350', brand: 'Royal Enfield', model: 'Hunter 350', category: 'CAFE_RACER', primaryColor: '#FF5500', secondaryColor: '#1E293B', accentColor: '#00E5FF' },
  { key: 'classic350', brand: 'Royal Enfield', model: 'Classic 350', category: 'CRUISER', primaryColor: '#DC2626', secondaryColor: '#C0C0C0', accentColor: '#F59E0B' },
  { key: 'bullet350', brand: 'Royal Enfield', model: 'Bullet 350', category: 'CRUISER', primaryColor: '#0F172A', secondaryColor: '#D4AF37', accentColor: '#38BDF8' },
  { key: 'meteor350', brand: 'Royal Enfield', model: 'Meteor 350', category: 'CRUISER', primaryColor: '#D97706', secondaryColor: '#1E293B', accentColor: '#10B981' },
  { key: 'gt650', brand: 'Royal Enfield', model: 'Continental GT 650', category: 'CAFE_RACER', primaryColor: '#DC2626', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'interceptor650', brand: 'Royal Enfield', model: 'Interceptor 650', category: 'ROADSTER', primaryColor: '#EA580C', secondaryColor: '#E2E8F0', accentColor: '#34D399' },
  { key: 'himalayan452', brand: 'Royal Enfield', model: 'Himalayan 452', category: 'ADV', primaryColor: '#0284C7', secondaryColor: '#475569', accentColor: '#FBBF24' },
  { key: 'guerrilla450', brand: 'Royal Enfield', model: 'Guerrilla 450', category: 'ROADSTER', primaryColor: '#EAB308', secondaryColor: '#18181B', accentColor: '#38BDF8' },
  { key: 'shotgun650', brand: 'Royal Enfield', model: 'Shotgun 650', category: 'CRUISER', primaryColor: '#15803D', secondaryColor: '#27272A', accentColor: '#F43F5E' },
  { key: 'supermeteor650', brand: 'Royal Enfield', model: 'Super Meteor 650', category: 'CRUISER', primaryColor: '#BE123C', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },

  // KTM
  { key: 'duke390', brand: 'KTM', model: 'Duke 390', category: 'ROADSTER', primaryColor: '#FF5500', secondaryColor: '#18181B', accentColor: '#00E5FF' },
  { key: 'duke250', brand: 'KTM', model: 'Duke 250', category: 'ROADSTER', primaryColor: '#FF5500', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'duke200', brand: 'KTM', model: 'Duke 200', category: 'ROADSTER', primaryColor: '#FF5500', secondaryColor: '#27272A', accentColor: '#A855F7' },
  { key: 'rc390', brand: 'KTM', model: 'RC 390', category: 'SUPERSPORT', primaryColor: '#FF5500', secondaryColor: '#0F172A', accentColor: '#22C55E' },
  { key: 'rc200', brand: 'KTM', model: 'RC 200', category: 'SUPERSPORT', primaryColor: '#FF5500', secondaryColor: '#334155', accentColor: '#38BDF8' },
  { key: 'adv390', brand: 'KTM', model: '390 Adventure', category: 'ADV', primaryColor: '#FF5500', secondaryColor: '#475569', accentColor: '#F59E0B' },
  { key: 'adv250', brand: 'KTM', model: '250 Adventure', category: 'ADV', primaryColor: '#FF5500', secondaryColor: '#1E293B', accentColor: '#10B981' },

  // Honda
  { key: 'cb300r', brand: 'Honda', model: 'CB300R', category: 'CAFE_RACER', primaryColor: '#334155', secondaryColor: '#DAA520', accentColor: '#38BDF8' },
  { key: 'cb350hness', brand: 'Honda', model: "CB350 H'ness", category: 'CRUISER', primaryColor: '#991B1B', secondaryColor: '#E2E8F0', accentColor: '#F59E0B' },
  { key: 'cb350rs', brand: 'Honda', model: 'CB350RS', category: 'ROADSTER', primaryColor: '#DC2626', secondaryColor: '#18181B', accentColor: '#10B981' },
  { key: 'nx500', brand: 'Honda', model: 'NX500', category: 'ADV', primaryColor: '#B91C1C', secondaryColor: '#1E293B', accentColor: '#38BDF8' },
  { key: 'cbr650r', brand: 'Honda', model: 'CBR650R', category: 'SUPERSPORT', primaryColor: '#E60012', secondaryColor: '#0F172A', accentColor: '#F59E0B' },

  // Bajaj
  { key: 'dominar400', brand: 'Bajaj', model: 'Dominar 400', category: 'ADV', primaryColor: '#15803D', secondaryColor: '#1E293B', accentColor: '#38BDF8' },
  { key: 'ns400z', brand: 'Bajaj', model: 'Pulsar NS400Z', category: 'ROADSTER', primaryColor: '#B91C1C', secondaryColor: '#DAA520', accentColor: '#00E5FF' },
  { key: 'ns200', brand: 'Bajaj', model: 'Pulsar NS200', category: 'ROADSTER', primaryColor: '#0F172A', secondaryColor: '#E2E8F0', accentColor: '#34D399' },
  { key: 'n250', brand: 'Bajaj', model: 'Pulsar N250', category: 'ROADSTER', primaryColor: '#1D4ED8', secondaryColor: '#1E293B', accentColor: '#F59E0B' },

  // Yamaha
  { key: 'mt15', brand: 'Yamaha', model: 'MT-15 V2', category: 'ROADSTER', primaryColor: '#0284C7', secondaryColor: '#18181B', accentColor: '#00E5FF' },
  { key: 'r15v4', brand: 'Yamaha', model: 'R15 V4', category: 'SUPERSPORT', primaryColor: '#1D4ED8', secondaryColor: '#DAA520', accentColor: '#22C55E' },
  { key: 'mt03', brand: 'Yamaha', model: 'MT-03', category: 'ROADSTER', primaryColor: '#06B6D4', secondaryColor: '#1E293B', accentColor: '#F43F5E' },

  // TVS
  { key: 'apacherr310', brand: 'TVS', model: 'Apache RR 310', category: 'SUPERSPORT', primaryColor: '#DC2626', secondaryColor: '#0F172A', accentColor: '#FBBF24' },
  { key: 'apachertr310', brand: 'TVS', model: 'Apache RTR 310', category: 'ROADSTER', primaryColor: '#EAB308', secondaryColor: '#18181B', accentColor: '#38BDF8' },
  { key: 'ronin225', brand: 'TVS', model: 'Ronin 225', category: 'ROADSTER', primaryColor: '#EA580C', secondaryColor: '#1E293B', accentColor: '#34D399' },

  // Kawasaki
  { key: 'ninja400', brand: 'Kawasaki', model: 'Ninja 400', category: 'SUPERSPORT', primaryColor: '#65A30D', secondaryColor: '#0F172A', accentColor: '#38BDF8' },
  { key: 'z900', brand: 'Kawasaki', model: 'Z900', category: 'ROADSTER', primaryColor: '#65A30D', secondaryColor: '#18181B', accentColor: '#F43F5E' },
  { key: 'zx4rr', brand: 'Kawasaki', model: 'Ninja ZX-4RR', category: 'SUPERSPORT', primaryColor: '#65A30D', secondaryColor: '#0F172A', accentColor: '#FBBF24' },

  // BMW
  { key: 'g310r', brand: 'BMW', model: 'G 310 R', category: 'ROADSTER', primaryColor: '#0284C7', secondaryColor: '#DC2626', accentColor: '#E2E8F0' },
  { key: 'g310gs', brand: 'BMW', model: 'G 310 GS', category: 'ADV', primaryColor: '#0284C7', secondaryColor: '#EA580C', accentColor: '#FBBF24' },
  { key: 's1000rr', brand: 'BMW', model: 'S 1000 RR', category: 'SUPERSPORT', primaryColor: '#0284C7', secondaryColor: '#DC2626', accentColor: '#FFFFFF' },

  // Triumph
  { key: 'speed400', brand: 'Triumph', model: 'Speed 400', category: 'ROADSTER', primaryColor: '#991B1B', secondaryColor: '#E2E8F0', accentColor: '#38BDF8' },
  { key: 'scrambler400x', brand: 'Triumph', model: 'Scrambler 400X', category: 'ADV', primaryColor: '#3F6212', secondaryColor: '#E2E8F0', accentColor: '#F59E0B' },
  { key: 'streettriple', brand: 'Triumph', model: 'Street Triple 765 R', category: 'ROADSTER', primaryColor: '#64748B', secondaryColor: '#DC2626', accentColor: '#00E5FF' },

  // Harley-Davidson
  { key: 'x440', brand: 'Harley-Davidson', model: 'X440', category: 'CRUISER', primaryColor: '#18181B', secondaryColor: '#EA580C', accentColor: '#FBBF24' },
  { key: 'nightster', brand: 'Harley-Davidson', model: 'Nightster 975', category: 'CRUISER', primaryColor: '#0F172A', secondaryColor: '#64748B', accentColor: '#F59E0B' }
];

const publicBikesDir = path.join(process.cwd(), 'public', 'bikes');

ALL_BIKEWALE_SPECS.forEach(b => {
  const svgContent = generateBikeWaleCutoutSvg(b);
  fs.writeFileSync(path.join(publicBikesDir, `${b.key}.svg`), svgContent, 'utf-8');
});

console.log(`Successfully generated ${ALL_BIKEWALE_SPECS.length} BikeWale-style side profile cutouts!`);
