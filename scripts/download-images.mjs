import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'images');
fs.mkdirSync(outDir, { recursive: true });
// Photo URLs are download sources; the React app references saved /public/images files.
const photos = [
  ['hero-showroom.jpg', 'photo-1600607687939-ce8a6c25118c', 2000],
  ['ceramic-tiles.jpg', 'photo-1600607687920-4e2a09cf159d', 1200],
  ['floor-tiles.jpg', 'photo-1600566753086-00f18fb6b3ea', 1200],
  ['sanitaryware.jpg', 'photo-1620626011761-996317b8d101', 1200],
  ['paint-colours.jpg', 'photo-1600210492486-724fe5c67fb0', 1200],
  ['interior-detail.jpg', 'photo-1600573472591-ee6b68d14c68', 1600],
  ['bathroom-detail.jpg', 'photo-1600607687644-c7171b42498f', 1600],
  ['hero-slide-01.jpg', 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1800'],
  ['hero-slide-02.jpg', 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1800'],
];
function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      if ([301, 302, 303, 307, 308].includes(response.statusCode) && response.headers.location && redirects > 0) {
        response.resume(); download(response.headers.location, dest, redirects - 1).then(resolve, reject); return;
      }
      if (response.statusCode !== 200) { response.resume(); reject(new Error(`HTTP ${response.statusCode} for ${url}`)); return; }
      const file = fs.createWriteStream(dest); response.pipe(file);
      file.on('finish', () => file.close(() => resolve()));
      file.on('error', err => { fs.unlink(dest, () => reject(err)); });
    }).on('error', reject);
  });
}
for (const [name, id, width] of photos) {
  const dest = path.join(outDir, name);
  if (fs.existsSync(dest)) {
    console.log(`Keeping existing ${name}`);
    continue;
  }
  const url = id.startsWith('https://') ? id : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=84`;
  try {
    await download(url, dest);
    const stat = fs.statSync(dest);
    if (stat.size < 10000) throw new Error(`Downloaded file looks too small (${stat.size} bytes)`);
    console.log(`Saved ${name} (${Math.round(stat.size / 1024)} KB)`);
  } catch (error) {
    console.error(`Could not download ${name}: ${error.message}`);
    process.exitCode = 1;
  }
}
