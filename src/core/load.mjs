// Carga el núcleo compartido en Node (lo usan los scripts y el MCP server).
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const here = dirname(fileURLToPath(import.meta.url));
await import(join(here, 'styles.js'));
await import(join(here, 'catalog.js'));
await import(join(here, 'generators.js'));
await import(join(here, 'create.js'));
export const STYLES = globalThis.STYLES;
export const CATALOG = globalThis.CATALOG;
export const P = globalThis.PROMPTERIA;
export const createStyle = globalThis.createStyle;
export const COLOR = globalThis.PROMPTERIA_COLOR;
