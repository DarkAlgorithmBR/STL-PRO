import fs from 'node:fs/promises';
import path from 'node:path';

const original = await fs.readFile(new URL('./reference/original.js', import.meta.url), 'utf8');
const assets = [...new Set([...original.matchAll(/"(\/assets\/[^"?]+\.(?:webp|png|jpg|svg))"/g)].map(m => m[1]))]
  .filter(p => !p.includes('poster'));
assets.push('/assets/vendor-react-WHN_XIgS.js', '/favicon.svg');
const root = new URL('./dist/', import.meta.url);
let completed = 0;
const failures = [];
const queue = [...assets];
await Promise.all(Array.from({length: 6}, async () => {
  while (queue.length) {
    const asset = queue.shift();
    const target = new URL(asset.slice(1), root);
    try {
      const response = await fetch(new URL(asset, 'https://centralprime3d.com'), {signal: AbortSignal.timeout(30000)});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      await fs.mkdir(path.dirname(target.pathname.replace(/^\/([A-Za-z]:)/, '$1')), {recursive: true});
      await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
      completed++;
    } catch (error) {
      failures.push({asset, error: error.message});
    }
  }
}));
console.log(JSON.stringify({completed, failures}));
if (failures.length) process.exitCode = 1;
