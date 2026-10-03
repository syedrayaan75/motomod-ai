import fs from 'fs';
import path from 'path';

// Exact bike color schemes and design specs
const BIKES_SPECS = [
  {
    key: 'guerrilla450',
    brand: 'Royal Enfield',
    model: 'Guerrilla 450',
    color1: '#FFB703', // Yellow & Black
    color2: '#111111',
    style: 'Urban Roadster',
    engine: '452cc Sherpa Single',
    bhp: '40 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'shotgun650',
    brand: 'Royal Enfield',
    model: 'Shotgun 650',
    color1: '#2D6A4F', // Drill Green / Stencil
    color2: '#1A1A1A',
    style: 'Custom Bobber',
    engine: '648cc Parallel Twin',
    bhp: '47 bhp',
    type: 'BOBBER'
  },
  {
    key: 'supermeteor650',
    brand: 'Royal Enfield',
    model: 'Super Meteor 650',
    color1: '#900C3F', // Celestial Red & Chrome
    color2: '#C0C0C0',
    style: 'Highway Cruiser',
    engine: '648cc Twin',
    bhp: '47 bhp',
    type: 'CRUISER'
  },
  {
    key: 'duke250',
    brand: 'KTM',
    model: 'Duke 250',
    color1: '#FF5500', // KTM Orange & Silver
    color2: '#E0E0E0',
    style: 'Naked Street',
    engine: '249cc DOHC Single',
    bhp: '31 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'duke200',
    brand: 'KTM',
    model: 'Duke 200',
    color1: '#FF5500', // KTM Orange & Black
    color2: '#111111',
    style: 'Urban Street',
    engine: '199cc DOHC Single',
    bhp: '25 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'rc200',
    brand: 'KTM',
    model: 'RC 200',
    color1: '#FF5500', // KTM Orange & Dark Galvano
    color2: '#222222',
    style: 'Race Entry',
    engine: '199cc Single',
    bhp: '25 bhp',
    type: 'SUPERSPORT'
  },
  {
    key: 'adv250',
    brand: 'KTM',
    model: '250 Adventure',
    color1: '#FF5500', // KTM Orange & Black ADV
    color2: '#444444',
    style: 'Touring ADV',
    engine: '248cc Single',
    bhp: '30 bhp',
    type: 'ADV'
  },
  {
    key: 'cb300r',
    brand: 'Honda',
    model: 'CB300R',
    color1: '#333333', // Matte Axis Gray
    color2: '#DAA520', // Gold USD Forks
    style: 'Neo Retro Cafe',
    engine: '286cc Single',
    bhp: '30.7 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'cb350hness',
    brand: 'Honda',
    model: "CB350 H'ness",
    color1: '#A30000', // Precious Red Metallic
    color2: '#E0E0E0', // Chrome
    style: 'Modern Classic',
    engine: '348cc Single',
    bhp: '21 bhp',
    type: 'CRUISER'
  },
  {
    key: 'cb350rs',
    brand: 'Honda',
    model: 'CB350RS',
    color1: '#C70039', // Radiant Red
    color2: '#111111', // Blacked out
    style: 'Scrambler Roadster',
    engine: '348cc Single',
    bhp: '21 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'nx500',
    brand: 'Honda',
    model: 'NX500',
    color1: '#D32F2F', // Grand Prix Red
    color2: '#111111',
    style: 'ADV Crossover',
    engine: '471cc Twin',
    bhp: '47 bhp',
    type: 'ADV'
  },
  {
    key: 'cbr650r',
    brand: 'Honda',
    model: 'CBR650R',
    color1: '#E60012', // Honda Racing Red
    color2: '#111111',
    style: 'Inline-4 Sport',
    engine: '649cc Inline-4',
    bhp: '87 bhp',
    type: 'SUPERSPORT'
  },
  {
    key: 'dominar400',
    brand: 'Bajaj',
    model: 'Dominar 400',
    color1: '#2E7D32', // Aurora Green
    color2: '#111111',
    style: 'Sports Tourer',
    engine: '373cc DOHC Single',
    bhp: '40 bhp',
    type: 'ADV'
  },
  {
    key: 'ns400z',
    brand: 'Bajaj',
    model: 'Pulsar NS400Z',
    color1: '#D32F2F', // Glossy Racing Red
    color2: '#DAA520', // Gold USD
    style: 'Naked Street',
    engine: '373cc Single',
    bhp: '40 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'ns200',
    brand: 'Bajaj',
    model: 'Pulsar NS200',
    color1: '#111111', // Ebony Black
    color2: '#E0E0E0',
    style: 'Streetfighter',
    engine: '199cc Triple Spark',
    bhp: '24.5 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'n250',
    brand: 'Bajaj',
    model: 'Pulsar N250',
    color1: '#1565C0', // Brooklyn Black / Blue
    color2: '#111111',
    style: 'Naked Roadster',
    engine: '249cc Single',
    bhp: '24.5 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'r15v4',
    brand: 'Yamaha',
    model: 'R15 V4',
    color1: '#0D47A1', // Racing Blue
    color2: '#DAA520', // Gold USD Forks
    style: 'Super Sport',
    engine: '155cc VVA Single',
    bhp: '18.4 bhp',
    type: 'SUPERSPORT'
  },
  {
    key: 'mt03',
    brand: 'Yamaha',
    model: 'MT-03',
    color1: '#00BCD4', // Cyan Storm
    color2: '#212121',
    style: 'Parallel-Twin Naked',
    engine: '321cc Twin',
    bhp: '42 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'apacherr310',
    brand: 'TVS',
    model: 'Apache RR 310',
    color1: '#D50000', // TVS Racing Red
    color2: '#111111',
    style: 'Racing Sport',
    engine: '312cc DOHC Single',
    bhp: '34 bhp',
    type: 'SUPERSPORT'
  },
  {
    key: 'apachertr310',
    brand: 'TVS',
    model: 'Apache RTR 310',
    color1: '#FFD600', // Fury Yellow
    color2: '#111111',
    style: 'Streetfighter',
    engine: '312cc Single',
    bhp: '35.6 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'ronin225',
    brand: 'TVS',
    model: 'Ronin 225',
    color1: '#FF6D00', // Orange & Black Scrambler
    color2: '#212121',
    style: 'Scrambler Dual',
    engine: '225cc Single',
    bhp: '20.4 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'z900',
    brand: 'Kawasaki',
    model: 'Z900',
    color1: '#76FF03', // Candy Lime Green
    color2: '#111111',
    style: 'Supernaked',
    engine: '948cc Inline-4',
    bhp: '125 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'zx4rr',
    brand: 'Kawasaki',
    model: 'Ninja ZX-4RR',
    color1: '#76FF03', // Lime Green Superbike
    color2: '#111111',
    style: 'Screaming Inline-4',
    engine: '399cc Inline-4',
    bhp: '77 bhp',
    type: 'SUPERSPORT'
  },
  {
    key: 'g310r',
    brand: 'BMW',
    model: 'G 310 R',
    color1: '#0099FF', // BMW Blue/White
    color2: '#FF2A2A',
    style: 'Roadster',
    engine: '313cc Single',
    bhp: '34 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'g310gs',
    brand: 'BMW',
    model: 'G 310 GS',
    color1: '#0288D1', // Rallye Blue
    color2: '#F57C00',
    style: 'Urban ADV',
    engine: '313cc Single',
    bhp: '34 bhp',
    type: 'ADV'
  },
  {
    key: 'speed400',
    brand: 'Triumph',
    model: 'Speed 400',
    color1: '#B71C1C', // Carnival Red
    color2: '#E0E0E0',
    style: 'Modern Roadster',
    engine: '398cc Single',
    bhp: '40 bhp',
    type: 'ROADSTER'
  },
  {
    key: 'scrambler400x',
    brand: 'Triumph',
    model: 'Scrambler 400X',
    color1: '#33691E', // Matte Khaki Green
    color2: '#E0E0E0',
    style: 'Scrambler ADV',
    engine: '398cc Single',
    bhp: '40 bhp',
    type: 'ADV'
  },
  {
    key: 'streettriple',
    brand: 'Triumph',
    model: 'Street Triple 765 R',
    color1: '#B0BEC5', // Silver Ice
    color2: '#D50000',
    style: 'Inline-3 Supernaked',
    engine: '765cc Triple',
    bhp: '120 bhp',
    type: 'STREETFIGHTER'
  },
  {
    key: 'x440',
    brand: 'Harley-Davidson',
    model: 'X440',
    color1: '#212121', // Denim Black
    color2: '#FF6D00',
    style: 'Neo Roadster',
    engine: '440cc Single',
    bhp: '27 bhp',
    type: 'CRUISER'
  },
  {
    key: 'nightster',
    brand: 'Harley-Davidson',
    model: 'Nightster 975',
    color1: '#111111', // Vivid Black V-Twin
    color2: '#757575',
    style: 'V-Twin Sportster',
    engine: '975cc Revolution Max V-Twin',
    bhp: '89 bhp',
    type: 'CRUISER'
  }
];

function generateBikeSvg(spec) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0E17" />
      <stop offset="100%" stop-color="#141B2D" />
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${spec.color1}" />
      <stop offset="100%" stop-color="${spec.color2}" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Studio Background -->
  <rect width="800" height="450" fill="url(#bgGrad)" />
  <circle cx="400" cy="225" r="280" fill="none" stroke="${spec.color1}" stroke-opacity="0.08" stroke-width="2" />
  <circle cx="400" cy="225" r="200" fill="none" stroke="${spec.color1}" stroke-opacity="0.05" stroke-dasharray="10 5" stroke-width="1.5" />

  <!-- Studio Floor Shadow -->
  <ellipse cx="400" cy="380" rx="320" ry="35" fill="black" opacity="0.6" />

  <!-- MOTORCYCLE SCHEMATIC ARTWORK -->
  <g transform="translate(60, 40)">
    <!-- Rear Wheel -->
    <circle cx="160" cy="290" r="85" fill="none" stroke="#222" stroke-width="24" />
    <circle cx="160" cy="290" r="85" fill="none" stroke="${spec.color1}" stroke-width="4" stroke-dasharray="25 8" filter="url(#glow)" />
    <circle cx="160" cy="290" r="45" fill="#111" stroke="#444" stroke-width="3" />
    <circle cx="160" cy="290" r="15" fill="${spec.color1}" />

    <!-- Front Wheel -->
    <circle cx="540" cy="290" r="85" fill="none" stroke="#222" stroke-width="24" />
    <circle cx="540" cy="290" r="85" fill="none" stroke="${spec.color1}" stroke-width="4" stroke-dasharray="25 8" filter="url(#glow)" />
    <circle cx="540" cy="290" r="45" fill="#111" stroke="#444" stroke-width="3" />
    <circle cx="540" cy="290" r="15" fill="${spec.color1}" />

    <!-- Engine Block -->
    <rect x="280" y="220" width="150" height="100" rx="10" fill="#1A1F2C" stroke="#3A465E" stroke-width="3" />
    <path d="M 300 240 L 410 240 M 300 260 L 410 260 M 300 280 L 410 280" stroke="${spec.color1}" stroke-width="3" opacity="0.8" />

    <!-- Exhaust Pipe -->
    <path d="M 330 290 L 460 300 L 520 280" fill="none" stroke="${spec.color2}" stroke-width="12" stroke-linecap="round" />

    <!-- Front Suspension Forks -->
    <line x1="540" y1="290" x2="470" y2="100" stroke="${spec.color2}" stroke-width="10" stroke-linecap="round" />

    <!-- Main Tank & Bodywork -->
    ${
      spec.type === 'SUPERSPORT'
        ? `<path d="M 180 290 L 260 160 L 440 120 L 520 210 L 450 300 Z" fill="url(#primaryGrad)" opacity="0.9" />
           <path d="M 260 160 L 350 110 L 440 120 Z" fill="${spec.color1}" />`
        : spec.type === 'ADV'
        ? `<path d="M 170 290 L 240 170 L 440 100 L 500 170 L 420 300 Z" fill="url(#primaryGrad)" opacity="0.9" />
           <path d="M 440 100 L 480 40 L 510 110 Z" fill="${spec.color1}" />`
        : spec.type === 'CRUISER'
        ? `<path d="M 160 290 L 260 210 L 420 140 L 470 200 L 400 300 Z" fill="url(#primaryGrad)" opacity="0.9" />
           <path d="M 320 150 C 380 130, 440 160, 420 200 Z" fill="${spec.color1}" />`
        : `<path d="M 180 290 L 260 180 L 430 130 L 490 200 L 420 300 Z" fill="url(#primaryGrad)" opacity="0.9" />
           <path d="M 310 140 L 410 120 L 430 170 Z" fill="${spec.color1}" />`
    }

    <!-- Handlebar & Headlight -->
    <circle cx="470" cy="100" r="14" fill="${spec.color1}" filter="url(#glow)" />
    <line x1="450" y1="90" x2="490" y2="90" stroke="#FFF" stroke-width="6" stroke-linecap="round" />
  </g>

  <!-- HUD BADGE & SPEC OVERLAY -->
  <rect x="40" y="30" width="300" height="70" rx="8" fill="rgba(8, 11, 16, 0.85)" stroke="${spec.color1}" stroke-width="1.5" />
  <text x="55" y="55" font-family="'DM Mono', monospace" font-size="14" font-weight="700" fill="${spec.color1}" letter-spacing="2">${spec.brand.toUpperCase()}</text>
  <text x="55" y="82" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#FFFFFF">${spec.model}</text>

  <rect x="520" y="30" width="240" height="70" rx="8" fill="rgba(8, 11, 16, 0.85)" stroke="#2A364F" stroke-width="1.5" />
  <text x="535" y="55" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#94A3B8">${spec.style.toUpperCase()}</text>
  <text x="535" y="80" font-family="'DM Mono', monospace" font-size="16" font-weight="700" fill="#00E5FF">${spec.engine} · ${spec.bhp}</text>
</svg>`;
}

const bikesDir = path.join(process.cwd(), 'public', 'bikes');
if (!fs.existsSync(bikesDir)) fs.mkdirSync(bikesDir, { recursive: true });

BIKES_SPECS.forEach(spec => {
  const svgContent = generateBikeSvg(spec);
  const filePath = path.join(bikesDir, `${spec.key}.svg`);
  fs.writeFileSync(filePath, svgContent, 'utf-8');
});

console.log('Successfully generated custom vector studio renders for all bikes!');
