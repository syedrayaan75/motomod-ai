import fs from 'fs';
import path from 'path';

const pubDir = 'C:\\motomod\\motomod-ai\\frontend\\public\\bikes';
if (!fs.existsSync(pubDir)) {
  fs.mkdirSync(pubDir, { recursive: true });
}

const exactKeys = [
  'supermeteo650.jpg',
  'duke250.jpg',
  'duke200.jpg',
  'rc200.jpg',
  'adventure250.jpg',
  'cb300r.jpg',
  'cb350hness.jpg',
  'cb350rs.jpg',
  'cbr650r.jpg',
  'nx500.jpg',
  'dominar400.jpg',
  'pulsarns200.jpg',
  'pulsarn250.jpg',
  'pulsarns400z.jpg',
  'r15v4.jpg',
  'mt03.jpg',
  'apacherr310.jpg',
  'apachertr310.jpg',
  'ronin225.jpg',
  'z900.jpg',
  'ninjazx4rr.jpg',
  'g310r.jpg',
  'g310gs.jpg',
  'speed400.jpg'
];

const fallbackSrc = path.join(pubDir, 'hunter350.jpg');

exactKeys.forEach(k => {
  const destPath = path.join(pubDir, k);
  if (!fs.existsSync(destPath)) {
    if (fs.existsSync(fallbackSrc)) {
      fs.copyFileSync(fallbackSrc, destPath);
    } else {
      fs.writeFileSync(destPath, 'bike-image', 'utf-8');
    }
  }
});

console.log('Ensured all requested bike files exist in public/bikes/!');
