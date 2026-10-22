#!/usr/bin/env node
// MCP server de Promptería: estilos, prompts, tokens y reglas para cualquier agente.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { STYLES, CATALOG, P, createStyle, COLOR } from '../src/core/load.mjs';

const styleIds = STYLES.map((s) => s.id);
const toolIds = Object.keys(CATALOG.tools);
const typeIds = Object.keys(CATALOG.types);
const stackIds = Object.keys(CATALOG.stacks);
const formatIds = Object.keys(P.EXPORTS);
const text = (t) => ({ content: [{ type: 'text', text: t }] });
const safe = (fn) => async (args) => { try { return text(fn(args)); } catch (e) { return { ...text(String(e.message || e)), isError: true }; } };

const server = new McpServer({ name: 'prompteria', version: '1.0.0' });

server.registerTool('list_styles', {
  title: 'Listar estilos',
  description: 'Lista los estilos visuales de Promptería con su id, nombre, concepto y colores principales.',
  inputSchema: {}
}, safe(() => STYLES.map((s) => `- ${s.id}: ${s.name}. ${s.concept} Fondo ${s.vars.bg}, acento ${s.vars.accent}, texto ${s.vars.ink}.`).join('\n')));

server.registerTool('get_style_prompt', {
  title: 'Prompt de look & feel',
  description: 'Devuelve el prompt de look & feel de un estilo, adaptado a una herramienta (claude, codex, grok, cursor, v0). Solo cambia el aspecto, nunca estructura ni contenido.',
  inputSchema: { style: z.enum(styleIds), tool: z.enum(toolIds).default('claude') }
}, safe(({ style, tool }) => P.lookPrompt(style, tool || 'claude')));

server.registerTool('build_dashboard_prompt', {
  title: 'Prompt de dashboard completo',
  description: 'Arma un prompt para construir un dashboard de un tipo dado, en un stack dado, con un estilo de Promptería, adaptado a la herramienta.',
  inputSchema: { type: z.enum(typeIds), style: z.enum(styleIds), stack: z.enum(stackIds).default('react'), tool: z.enum(toolIds).default('claude') }
}, safe(({ type, style, stack, tool }) => P.fullPrompt(type, style, stack || 'react', tool || 'claude')));

server.registerTool('get_tokens', {
  title: 'Exportar estilo',
  description: 'Exporta un estilo en un formato: css (variables), tailwind, tokens (design tokens JSON), powerbi (tema JSON), skill (SKILL.md de Claude Code), agents (AGENTS.md de Codex) o cursor (regla .mdc).',
  inputSchema: { style: z.enum(styleIds), format: z.enum(formatIds) }
}, safe(({ style, format }) => { const f = P.exportFile(style, format); return `Archivo: ${f.filename}\n\n${f.content}`; }));

server.registerTool('create_style', {
  title: 'Crear estilo desde un color de marca',
  description: 'Genera un estilo completo de Promptería a partir de un color de marca (y opcionalmente un segundo color), con contraste AA en el texto. Devuelve el JSON del estilo, el prompt de look & feel y los archivos pedidos. Guardá el JSON como prompteria/<id>.json para reutilizarlo con la CLI.',
  inputSchema: {
    name: z.string().min(1).describe('Nombre del estilo, por ejemplo el de la marca'),
    primary: z.string().regex(/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/).describe('Color de marca en hex'),
    secondary: z.string().regex(/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/).optional().describe('Segundo color en hex'),
    mode: z.enum(['dark', 'light']).default('dark'),
    tool: z.enum(toolIds).default('claude'),
    formats: z.array(z.enum(formatIds)).default(['css']).describe('Archivos a devolver además del JSON')
  }
}, safe(({ name, primary, secondary, mode, tool, formats }) => {
  const s = createStyle({ name, primary, secondary, mode });
  const c = COLOR.contrast(s.vars.ink, s.vars.bg).toFixed(1), m = COLOR.contrast(s.vars.muted, s.vars.bg).toFixed(1);
  const files = (formats || ['css']).map((f) => { const e = P.exportFile(s, f); return `### ${e.filename}\n\n${e.content}`; }).join('\n\n');
  return `Estilo "${s.name}" (${s.generated.mode}). Contraste del texto ${c}:1, secundario ${m}:1.\n\n### prompteria/${s.id}.json\n\n${JSON.stringify(s, null, 2)}\n\n### Prompt para ${CATALOG.tools[tool || 'claude'].name}\n\n${P.lookPrompt(s, tool || 'claude')}\n\n${files}`;
}));

server.registerTool('quality_checklist', {
  title: 'Checklist de calidad',
  description: 'Devuelve la checklist para revisar una interfaz generada por IA antes de mergear.',
  inputSchema: {}
}, safe(() => CATALOG.checklist.map((c) => `- [ ] ${c.text}`).join('\n')));

await server.connect(new StdioServerTransport());
console.error('Promptería MCP listo por stdio');
