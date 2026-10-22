// Pruebas rápidas: todos los estilos generan todo, el generador cumple contraste y el MCP responde.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { STYLES, CATALOG, P, createStyle, COLOR } from '../src/core/load.mjs';

let n = 0;
for (const s of STYLES) {
  for (const t of Object.keys(CATALOG.tools)) { { const p = P.lookPrompt(s.id, t); assert.ok(p.includes(s.name) || p.includes(s.id)); n++; } }
  for (const f of Object.keys(P.EXPORTS)) { assert.ok(P.exportFile(s.id, f).content.length > 50); n++; }
  for (const d of Object.keys(CATALOG.types)) { assert.ok(P.fullPrompt(d, s.id, 'react', 'claude').length > 200); n++; }
  JSON.parse(P.exportFile(s.id, 'powerbi').content); JSON.parse(P.exportFile(s.id, 'tokens').content); n += 2;
}
for (const primary of ['#0F766E', '#FFD60A', '#E11D48', '#111111', '#FFFFFF', '#7C3AED', '#22C55E']) {
  for (const mode of ['dark', 'light']) {
    const s = createStyle({ name: 'Test', primary, mode });
    assert.ok(COLOR.contrast(s.vars.ink, s.vars.bg) >= 7, `ink ${primary} ${mode}`);
    assert.ok(COLOR.contrast(s.vars.muted, s.vars.bg) >= 4.5, `muted ${primary} ${mode}`);
    assert.ok(COLOR.contrast(s.vars['accent-ink'], s.vars.accent) >= 4.5, `accent ${primary} ${mode}`);
    n += 3;
  }
}
const r = spawnSync(process.execPath, [new URL('../bin/prompteria.mjs', import.meta.url).pathname, 'list']);
assert.equal(r.status, 0); n++;
console.log(`OK: ${n} comprobaciones`);
