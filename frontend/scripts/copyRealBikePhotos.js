import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\syedr\\.gemini\\antigravity\\brain\\67a68f67-a1bd-4a3e-a766-ae70335b2cb8';
const pubDir = 'C:\\motomod\\motomod-ai\\frontend\\public\\bikes';

if (!fs.existsSync(pubDir)) {
  fs.mkdirSync(pubDir, { recursive: true });
}

const copyMap = {
  'royal_enfield_hunter_1785684000368.jpg': 'hunter350.jpg',
  'royal_enfield_classic_1785684057517.jpg': 'classic350.jpg',
  're_bullet350_1785685006925.jpg': 'bullet350.jpg',
  're_meteor350_1785685023531.jpg': 'meteor350.jpg',
  'continental_gt_1785684084513.jpg': 'gt650.jpg',
  're_interceptor650_1785684485247.jpg': 'interceptor650.jpg',
  're_himalayan452_1785684457821.jpg': 'himalayan452.jpg',
  'ktm_duke_390_1785684030947.jpg': 'duke390.jpg',
  'ktm_rc390_1785684508829.jpg': 'rc390.jpg',
  'ktm_adv390_1785684541510.jpg': 'adv390.jpg',
  'kawasaki_ninja400_1785684602789.jpg': 'ninja400.jpg',
  'bmw_s1000rr_1785685050959.jpg': 's1000rr.jpg',
  'yamaha_mt15_1785685037409.jpg': 'mt15.jpg'
};

Object.entries(copyMap).forEach(([srcName, destName]) => {
  const srcPath = path.join(brainDir, srcName);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.join(pubDir, destName));
    console.log(`Copied ${srcName} -> ${destName}`);
  }
});
