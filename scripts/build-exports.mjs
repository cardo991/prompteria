// Genera exports/<estilo>/ con todos los formatos y prompts por herramienta.
// Uso: npm run exports
import { mkdir, writeFile, rm } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STYLES, CATALOG, P } from '../src/core/load.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'exports');
await rm(root, { recursive: true, force: true });

for (const s of STYLES) {
  const dir = join(root, s.id);
  await mkdir(join(dir, 'prompts'), { recursive: true });
  for (const format of Object.keys(P.EXPORTS)) {
    const { filename, content } = P.exportFile(s.id, format);
    await writeFile(join(dir, filename), content);
  }
  for (const tool of Object.keys(CATALOG.tools)) {
    await writeFile(join(dir, 'prompts', `${tool}.md`), P.lookPrompt(s.id, tool) + '\n');
  }
}

const index = ['# Exportaciones', '', 'Generadas con `npm run exports` a partir de `src/core/`. No las edites a mano.', '', '| Estilo | Archivos |', '|---|---|',
  ...STYLES.map((s) => `| ${s.name} | [carpeta](./${s.id}/) |`), '',
  'Cada carpeta tiene `tokens.css`, `tailwind.config.js`, `tokens.json`, `powerbi-theme.json`, `SKILL.md`, `AGENTS.md`, `estilo-<id>.mdc` y `prompts/<herramienta>.md`.', ''].join('\n');
await writeFile(join(root, 'README.md'), index);
console.log(`Listo: ${STYLES.length} estilos exportados en exports/`);
