// Arma src/core/styles.js desde styles/*.json y regenera exports/.
// Uso: npm run build
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'styles');
const order = JSON.parse(await readFile(join(dir, 'order.json'), 'utf8'));
const files = (await readdir(dir)).filter((f) => f.endsWith('.json') && f !== 'order.json');
const ids = files.map((f) => f.replace(/\.json$/, ''));
const sorted = [...order.filter((id) => ids.includes(id)), ...ids.filter((id) => !order.includes(id)).sort()];

const REQUIRED = ['id', 'name', 'swatch', 'concept', 'vars', 'type', 'shape', 'surfaces', 'components', 'charts', 'details', 'avoid'];
const VARS = ['bg', 'surface', 'surface-2', 'border', 'ink', 'muted', 'accent', 'accent-ink', 'pos', 'warn', 'neg', 'c1', 'c2', 'c3', 'c4', 'hero', 'hero-ink', 'hero-muted', 'card-bg', 'font', 'font-num', 'radius'];
const styles = [];
for (const id of sorted) {
  const s = JSON.parse(await readFile(join(dir, id + '.json'), 'utf8'));
  const miss = REQUIRED.filter((k) => !(k in s)).concat(VARS.filter((k) => !(k in (s.vars || {}))).map((k) => 'vars.' + k));
  if (miss.length) throw new Error(`styles/${id}.json: faltan ${miss.join(', ')}`);
  if (s.id !== id) throw new Error(`styles/${id}.json: el id debe ser "${id}"`);
  styles.push(s);
}
const out = `/*\n * ARCHIVO GENERADO por scripts/build.mjs desde styles/*.json. No lo edites a mano.\n */\n(function (g) {\n  g.STYLES = ${JSON.stringify(styles, null, 2).replace(/\n/g, '\n  ')};\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
await writeFile(join(root, 'src/core/styles.js'), out);
console.log(`styles.js: ${styles.length} estilos`);
await import('./build-exports.mjs');
