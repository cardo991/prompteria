#!/usr/bin/env node
// CLI de Promptería: aplicá un estilo a tu proyecto en un comando.
import { parseArgs } from 'node:util';
import { mkdir, writeFile, readFile, access } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { STYLES, CATALOG, P, createStyle, COLOR } from '../src/core/load.mjs';

const HELP = `
Promptería: estilos visuales, prompts y reglas para interfaces hechas con IA.

Uso:
  npx prompteria list
  npx prompteria add <estilo | archivo.json> [opciones]
  npx prompteria create --name "Acme" --primary "#0F766E" [opciones]
  npx prompteria prompt <estilo> [--tool claude] [--dashboard cripto --stack react]
  npx prompteria mcp

Opciones de add y create:
  --tool     claude, cursor, codex o all (por defecto detecta tu proyecto)
  --tokens   css, tailwind, tokens, powerbi o none (por defecto css)
  --dir      carpeta del proyecto (por defecto la actual)
  --dry-run  muestra qué archivos escribiría sin tocar nada

Opciones de create:
  --primary    color de marca en hex (obligatorio)
  --secondary  segundo color en hex (opcional)
  --mode       dark o light (por defecto dark)
  --font       tipografía (por defecto Inter)
  --radius     radio en px (por defecto 20)
  --no-apply   solo guarda el JSON del estilo
`;

const exists = async (p) => { try { await access(p); return true; } catch { return false; } };
const list = (v) => String(v || '').split(',').map((x) => x.trim()).filter(Boolean);

async function loadStyle(ref, dir) {
  if (/\.json$/i.test(ref)) {
    const s = JSON.parse(await readFile(resolve(dir, ref), 'utf8'));
    if (!s.vars || !s.name) throw new Error(`${ref} no parece un estilo de Promptería`);
    return s;
  }
  const s = STYLES.find((x) => x.id === ref);
  if (!s) throw new Error(`No existe el estilo "${ref}". Probá: ${STYLES.map((x) => x.id).join(', ')}`);
  return s;
}

async function detectTools(dir) {
  const t = [];
  if (await exists(join(dir, '.claude')) || await exists(join(dir, 'CLAUDE.md'))) t.push('claude');
  if (await exists(join(dir, '.cursor')) || await exists(join(dir, '.cursorrules'))) t.push('cursor');
  if (await exists(join(dir, 'AGENTS.md')) || await exists(join(dir, '.codex'))) t.push('codex');
  return t.length ? t : ['claude', 'cursor', 'codex'];
}

async function apply(style, dir, opts) {
  const tools = opts.tool && opts.tool !== 'auto' ? (opts.tool === 'all' ? ['claude', 'cursor', 'codex'] : list(opts.tool)) : await detectTools(dir);
  const tokens = opts.tokens === 'none' ? [] : list(opts.tokens || 'css');
  if (tokens.includes('tailwind') && !tokens.includes('css')) tokens.unshift('css');
  const plan = [];
  for (const t of tools) {
    if (t === 'claude') plan.push({ path: `.claude/skills/estilo-${style.id}/SKILL.md`, content: P.exportFile(style, 'skill').content });
    else if (t === 'cursor') plan.push({ path: `.cursor/rules/estilo-${style.id}.mdc`, content: P.exportFile(style, 'cursor').content });
    else if (t === 'codex') {
      const file = join(dir, 'AGENTS.md');
      const prev = (await exists(file)) ? await readFile(file, 'utf8') : '';
      const block = `<!-- prompteria:start -->\n${P.exportFile(style, 'agents').content.trim()}\n<!-- prompteria:end -->`;
      const next = /<!-- prompteria:start -->[\s\S]*?<!-- prompteria:end -->/.test(prev)
        ? prev.replace(/<!-- prompteria:start -->[\s\S]*?<!-- prompteria:end -->/, block)
        : (prev ? prev.trimEnd() + '\n\n' : '') + block + '\n';
      plan.push({ path: 'AGENTS.md', content: next });
    } else throw new Error(`Herramienta desconocida: ${t}. Usá claude, cursor, codex o all.`);
  }
  for (const f of tokens) {
    if (!P.EXPORTS[f] || ['skill', 'agents', 'cursor'].includes(f)) throw new Error(`Formato de tokens desconocido: ${f}. Usá css, tailwind, tokens o powerbi.`);
    const e = P.exportFile(style, f);
    plan.push({ path: `prompteria/${style.id}/${e.filename}`, content: e.content });
  }
  for (const f of plan) {
    if (opts['dry-run']) { console.log(`  escribiría  ${f.path}`); continue; }
    const full = join(dir, f.path);
    await mkdir(dirname(full), { recursive: true });
    await writeFile(full, f.content);
    console.log(`  ✓ ${f.path}`);
  }
  if (!opts['dry-run']) {
    console.log(`\nListo. "${style.name}" quedó aplicado para: ${tools.join(', ')}.`);
    console.log(`Pedile a tu agente: "Aplicá el estilo estilo-${style.id} a la interfaz".`);
  }
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { values, positionals } = parseArgs({
    args: rest, allowPositionals: true,
    options: {
      tool: { type: 'string' }, tokens: { type: 'string' }, dir: { type: 'string' }, 'dry-run': { type: 'boolean' },
      name: { type: 'string' }, primary: { type: 'string' }, secondary: { type: 'string' }, mode: { type: 'string' },
      font: { type: 'string' }, radius: { type: 'string' }, 'no-apply': { type: 'boolean' },
      dashboard: { type: 'string' }, stack: { type: 'string' }, help: { type: 'boolean', short: 'h' }
    }
  });
  const dir = resolve(values.dir || '.');
  if (!cmd || cmd === 'help' || values.help) return console.log(HELP);

  if (cmd === 'list') {
    for (const s of STYLES) console.log(`${s.id.padEnd(12)} ${s.name}. ${s.concept}`);
    return;
  }
  if (cmd === 'add') {
    if (!positionals[0]) throw new Error('Decime qué estilo: npx prompteria add aurora');
    const s = await loadStyle(positionals[0], dir);
    console.log(`Aplicando "${s.name}" en ${dir}\n`);
    return apply(s, dir, values);
  }
  if (cmd === 'create') {
    if (!values.primary) throw new Error('Falta el color: npx prompteria create --name "Acme" --primary "#0F766E"');
    const s = createStyle({ name: values.name || 'Mi marca', primary: values.primary, secondary: values.secondary, mode: values.mode, font: values.font, radius: values.radius });
    const ok = COLOR.contrast(s.vars.ink, s.vars.bg).toFixed(1), okm = COLOR.contrast(s.vars.muted, s.vars.bg).toFixed(1);
    const jsonPath = `prompteria/${s.id}.json`;
    console.log(`Estilo "${s.name}" (${s.generated.mode}): fondo ${s.vars.bg}, acento ${s.vars.accent}. Contraste del texto ${ok}:1, secundario ${okm}:1.\n`);
    if (values['dry-run']) console.log(`  escribiría  ${jsonPath}`);
    else { await mkdir(join(dir, 'prompteria'), { recursive: true }); await writeFile(join(dir, jsonPath), JSON.stringify(s, null, 2) + '\n'); console.log(`  ✓ ${jsonPath}`); }
    if (values['no-apply']) return console.log(`\nPara aplicarlo después: npx prompteria add ${jsonPath}`);
    return apply(s, dir, values);
  }
  if (cmd === 'prompt') {
    if (!positionals[0]) throw new Error('Decime qué estilo: npx prompteria prompt aurora --tool claude');
    const s = await loadStyle(positionals[0], dir);
    const tool = values.tool || 'claude';
    return console.log(values.dashboard ? P.fullPrompt(values.dashboard, s, values.stack || 'react', tool) : P.lookPrompt(s, tool));
  }
  if (cmd === 'mcp') { await import('../mcp/server.mjs'); return; }
  throw new Error(`No conozco el comando "${cmd}". Probá: npx prompteria help`);
}

main().catch((e) => { console.error('Error: ' + (e.message || e)); process.exit(1); });
