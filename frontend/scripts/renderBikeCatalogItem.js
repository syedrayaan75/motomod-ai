import fs from 'fs';
import path from 'path';

export function renderCatalogSvg(bike) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 500" width="100%" height="100%">
  <defs>
    <linearGradient id="studioBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090D16" />
      <stop offset="50%" stop-color="#111827" />
      <stop offset="100%" stop-color="#0F172A" />
    </linearGradient>

    <linearGradient id="tankGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${bike.primaryColor}" />
      <stop offset="100%" stop-color="${bike.secondaryColor}" />
    </linearGradient>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <pattern id="dotPattern" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="12" cy="12" r="1.5" fill="rgba(255, 255, 255, 0.04)" />
    </pattern>
  </defs>

  <!-- Neutral Studio Background & Lighting Grid -->
  <rect width="900" height="500" fill="url(#studioBg)" />
  <rect width="900" height="500" fill="url(#dotPattern)" />
  <ellipse cx="450" cy="420" rx="360" ry="30" fill="#000" opacity="0.65" />
  
  <!-- Subtle Studio Overhead Spotlight -->
  <ellipse cx="450" cy="120" rx="280" ry="90" fill="${bike.primaryColor}" opacity="0.05" filter="url(#softGlow)" />

  <!-- MOTORCYCLE CATALOG VECTOR ARTWORK -->
  <g transform="translate(70, 50)">
    <!-- Rear Tire & Rim -->
    <circle cx="160" cy="300" r="90" fill="none" stroke="#1A202C" stroke-width="26" />
    <circle cx="160" cy="300" r="90" fill="none" stroke="${bike.primaryColor}" stroke-width="3" stroke-dasharray="30 10" filter="url(#softGlow)" />
    <circle cx="160" cy="300" r="50" fill="#0F172A" stroke="#334155" stroke-width="4" />
    <circle cx="160" cy="300" r="18" fill="${bike.accentColor}" />
    <!-- Rear Brake Disc -->
    <circle cx="160" cy="300" r="34" fill="none" stroke="#64748B" stroke-width="4" stroke-dasharray="8 4" />

    <!-- Front Tire & Rim -->
    <circle cx="580" cy="300" r="90" fill="none" stroke="#1A202C" stroke-width="26" />
    <circle cx="580" cy="300" r="90" fill="none" stroke="${bike.primaryColor}" stroke-width="3" stroke-dasharray="30 10" filter="url(#softGlow)" />
    <circle cx="580" cy="300" r="50" fill="#0F172A" stroke="#334155" stroke-width="4" />
    <circle cx="580" cy="300" r="18" fill="${bike.accentColor}" />
    <!-- Front Brake Disc & Caliper -->
    <circle cx="580" cy="300" r="38" fill="none" stroke="#94A3B8" stroke-width="5" stroke-dasharray="10 4" />
    <rect x="590" y="270" width="20" height="30" rx="4" fill="${bike.accentColor}" />

    <!-- Engine Crankcase & Exhaust -->
    <rect x="290" y="230" width="160" height="110" rx="12" fill="#1E293B" stroke="#475569" stroke-width="3" />
    <path d="M 310 250 L 430 250 M 310 275 L 430 275 M 310 300 L 430 300" stroke="${bike.primaryColor}" stroke-width="3" opacity="0.8" />
    <circle cx="370" cy="275" r="22" fill="#0F172A" stroke="${bike.secondaryColor}" stroke-width="2" />

    <!-- Exhaust System Pipe -->
    <path d="M 340 310 L 490 325 L 560 300" fill="none" stroke="${bike.secondaryColor}" stroke-width="14" stroke-linecap="round" />

    <!-- Front Forks Suspension -->
    <line x1="580" y1="300" x2="500" y2="90" stroke="${bike.secondaryColor}" stroke-width="12" stroke-linecap="round" />
    <line x1="568" y1="300" x2="490" y2="90" stroke="#475569" stroke-width="6" stroke-linecap="round" />

    <!-- Body Geometry Style (Customized per bike category) -->
    ${
      bike.category === 'SUPERSPORT'
        ? `<path d="M 180 300 L 260 160 L 460 110 L 550 200 L 460 310 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="460,110 540,65 570,140 490,190" fill="${bike.primaryColor}" />
           <path d="M 260 160 L 370 100 L 460 110 Z" fill="${bike.secondaryColor}" />`
        : bike.category === 'ADV'
        ? `<path d="M 170 300 L 240 170 L 460 90 L 530 170 L 430 310 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="460,90 510,20 540,110 480,150" fill="${bike.primaryColor}" />
           <rect x="180" y="160" width="50" height="40" fill="#334155" rx="4" />`
        : bike.category === 'CRUISER'
        ? `<path d="M 160 300 L 260 220 L 440 140 L 490 210 L 420 310 Z" fill="url(#tankGrad)" opacity="0.95" />
           <path d="M 330 150 C 390 120, 460 160, 440 210 Z" fill="${bike.primaryColor}" />`
        : bike.category === 'CAFE_RACER'
        ? `<path d="M 180 300 L 240 170 L 450 130 L 490 200 L 430 310 Z" fill="url(#tankGrad)" opacity="0.95" />
           <rect x="230" y="150" width="50" height="25" fill="${bike.primaryColor}" rx="12" />
           <path d="M 320 135 L 440 130 L 450 170 L 330 170 Z" fill="${bike.secondaryColor}" />`
        : `<path d="M 180 300 L 260 180 L 450 120 L 510 200 L 440 310 Z" fill="url(#tankGrad)" opacity="0.95" />
           <polygon points="320,130 430,110 460,165 330,175" fill="${bike.primaryColor}" />`
    }

    <!-- Round LED Headlight & Handlebar -->
    <circle cx="500" cy="90" r="18" fill="${bike.primaryColor}" filter="url(#softGlow)" />
    <circle cx="500" cy="90" r="12" fill="#FFFFFF" opacity="0.9" />
    <line x1="470" y1="80" x2="520" y2="80" stroke="#F8FAFC" stroke-width="8" stroke-linecap="round" />
  </g>

  <!-- CATALOG SPECIFICATIONS DISPLAY OVERLAY -->
  <rect x="40" y="30" width="360" height="90" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="${bike.primaryColor}" stroke-width="2" />
  <text x="60" y="58" font-family="'DM Mono', monospace" font-size="13" font-weight="700" fill="${bike.accentColor}" letter-spacing="2">${bike.brand.toUpperCase()}</text>
  <text x="60" y="88" font-family="'Space Grotesk', sans-serif" font-size="24" font-weight="700" fill="#FFFFFF">${bike.model}</text>
  <text x="60" y="108" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="#22C55E">${bike.price}</text>

  <!-- TECHNICAL METRICS PANEL -->
  <rect x="520" y="30" width="340" height="90" rx="10" fill="rgba(15, 23, 42, 0.9)" stroke="#334155" stroke-width="1.5" />
  <text x="540" y="55" font-family="'DM Mono', monospace" font-size="12" font-weight="700" fill="#94A3B8">ENGINE & CHASSIS SPECS</text>
  <text x="540" y="80" font-family="'Space Grotesk', sans-serif" font-size="15" font-weight="700" fill="#00E5FF">${bike.engineCc} cc · ${bike.powerBhp} bhp · ${bike.torqueNm} Nm</text>
  <text x="540" y="103" font-family="'DM Mono', monospace" font-size="12" fill="#CBD5E1">Weight: ${bike.weightKg} kg · Mileage: ${bike.mileage} km/l · Seat: ${bike.seatHeight} mm</text>
</svg>`;
}
