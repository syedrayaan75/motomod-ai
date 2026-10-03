import fs from 'fs';
import path from 'path';
import https from 'https';

const pubDir = path.join(process.cwd(), 'public', 'bikes');
if (!fs.existsSync(pubDir)) {
  fs.mkdirSync(pubDir, { recursive: true });
}

const images = {
  "hunter350.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Royal_Enfield_Hunter_350.jpg/800px-Royal_Enfield_Hunter_350.jpg",
  "classic350.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Royal_Enfield_Classic_350.jpg/800px-Royal_Enfield_Classic_350.jpg",
  "bullet350.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Royal_Enfield_Bullet_350.jpg/800px-Royal_Enfield_Bullet_350.jpg",
  "meteor350.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Royal_Enfield_Meteor_350.jpg/800px-Royal_Enfield_Meteor_350.jpg",
  "himalayan.jpg": "https://upload.wikimedia.org/wikipedia/commons/a/a2/Royal_Enfield_Himalayan.jpg",
  "supermeteo650.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Royal_Enfield_Super_Meteor_650.jpg/800px-Royal_Enfield_Super_Meteor_650.jpg",
  "interceptor650.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Royal_Enfield_Interceptor_650.jpg/800px-Royal_Enfield_Interceptor_650.jpg",
  "gt650.jpg": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Royal_Enfield_Continental_GT_650.jpg/800px-Royal_Enfield_Continental_GT_650.jpg",
};

function downloadUrl(url, destPath) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) MotoModApp/1.0 (contact@motomod.ai)'
      }
    };

    https.get(url, options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadUrl(res.headers.location, destPath).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: Status code ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close(() => resolve());
      });

      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  console.log('--- Royal Enfield Image Downloader ---');
  for (const [filename, url] of Object.entries(images)) {
    const destPath = path.join(pubDir, filename);

    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      const sizeKb = (stats.size / 1024).toFixed(2);
      if (stats.size >= 200 * 1024) {
        console.log(`[SKIPPED] ${filename} already exists (${sizeKb} KB)`);
        continue;
      }
    }

    try {
      console.log(`[DOWNLOADING] ${filename}...`);
      if (filename === 'himalayan.jpg') {
        const him452 = path.join(pubDir, 'himalayan452.jpg');
        if (fs.existsSync(him452)) {
          fs.copyFileSync(him452, destPath);
          console.log(`[COPIED] copied himalayan452.jpg -> himalayan.jpg`);
          continue;
        }
      }
      await downloadUrl(url, destPath);
      const stats = fs.statSync(destPath);
      const sizeKb = (stats.size / 1024).toFixed(2);

      if (stats.size < 200 * 1024) {
        console.log(`[WARNING] ${filename} downloaded but size is ${sizeKb} KB (under 200KB threshold).`);
      } else {
        console.log(`[SUCCESS] ${filename} downloaded successfully (${sizeKb} KB)`);
      }
    } catch (err) {
      console.error(`[ERROR] ${filename}: ${err.message}`);
    }
  }

  console.log('\n--- Final Directory Verification ---');
  for (const filename of Object.keys(images)) {
    const destPath = path.join(pubDir, filename);
    if (fs.existsSync(destPath)) {
      const stats = fs.statSync(destPath);
      console.log(`${filename}: ${(stats.size / 1024).toFixed(2)} KB`);
    } else {
      console.log(`${filename}: NOT FOUND`);
    }
  }
}

run();
