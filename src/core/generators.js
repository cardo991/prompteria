/*
 * Generadores de Promptería: prompts por herramienta, prompt completo del
 * constructor y exportaciones (CSS, Tailwind, design tokens, Power BI,
 * SKILL.md, AGENTS.md y regla de Cursor).
 * Requiere src/core/styles.js y src/core/catalog.js cargados antes.
 */
(function (g) {
  /* Acepta el id de un estilo del repo o un objeto de estilo (por ejemplo, uno creado con createStyle). */
  const style = (id) => {
    if (id && typeof id === 'object') return id;
    const s = g.STYLES.find((x) => x.id === id);
    if (!s) throw new Error('Estilo desconocido: ' + id + '. Opciones: ' + g.STYLES.map((x) => x.id).join(', '));
    return s;
  };
  const GUARD = 'No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.';

  /* ---------- Colores ---------- */
  const isHex = (c) => /^#[0-9a-f]{6}$/i.test(c);
  function hexToRgb(h) { return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); }
  function rgbToHex(r) { return '#' + r.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase(); }
  /* Convierte rgba(...) a hex mezclándolo con el fondo; transparent devuelve el fondo. */
  function solid(c, bg) {
    if (isHex(c)) return c.toUpperCase();
    const b = hexToRgb(bg);
    if (c === 'transparent') return rgbToHex(b);
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return rgbToHex(b);
    const p = m[1].split(',').map((x) => parseFloat(x));
    const a = p[3] === undefined ? 1 : p[3];
    return rgbToHex([0, 1, 2].map((i) => p[i] * a + b[i] * (1 - a)));
  }
  const firstFont = (stack) => stack.split(',')[0].replace(/"/g, '').trim();

  /* ---------- Bloque de estilo (común a todos los prompts) ---------- */
  function lookBlock(s) {
    const v = s.vars;
    return [
      `${s.name}. ${s.concept}`,
      '',
      'Paleta',
      `- Fondo ${v.bg}, superficies ${v.surface}, superficie elevada ${v['surface-2']}, bordes ${v.border}.`,
      `- Texto ${v.ink}, texto secundario ${v.muted}.`,
      `- Acento ${v.accent} (texto encima ${v['accent-ink']}).`,
      `- Estados: positivo ${v.pos}, alerta ${v.warn}, negativo ${v.neg}.`,
      `- Series de gráficos, en este orden: ${v.c1}, ${v.c2}, ${v.c3}, ${v.c4}.`,
      '',
      `Tipografía: ${s.type}`,
      `Formas: ${s.shape}`,
      `Superficies: ${s.surfaces}`,
      `Componentes: ${s.components}`,
      `Gráficos: ${s.charts}`,
      `Detalles: ${s.details}`,
      `Evitá: ${s.avoid}`
    ].join('\n');
  }
  const REQS = 'Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.';

  /* ---------- Prompt de look & feel por herramienta ---------- */
  function lookPrompt(styleId, toolId) {
    const s = style(styleId), v = s.vars, L = lookBlock(s);
    switch (toolId) {
      case 'claude':
        return `<tarea>\nAplicá el estilo visual "${s.name}" a la interfaz que te paso o al proyecto abierto.\n</tarea>\n\n<restricciones>\n${GUARD}\n</restricciones>\n\n<estilo>\n${L}\n</estilo>\n\n<requisitos>\n${REQS}\n</requisitos>\n\n<entrega>\nPrimero listá los archivos de estilos que vas a tocar. Después hacé los cambios y cerrá con un resumen corto de qué cambió.\n</entrega>`;
      case 'codex':
        return `## Tarea\nAplicar el estilo visual "${s.name}" al proyecto.\n\n## Alcance\n- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.\n- ${GUARD}\n\n## Especificación\n${L}\n\n## Criterios de aceptación\n- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.\n- ${REQS}\n- El build y los tests pasan sin cambios en la lógica.\n\n## Entrega\nUn diff acotado y un resumen de los tokens que agregaste o cambiaste.`;
      case 'grok':
        return `Restyleá mi interfaz con el estilo "${s.name}". Reglas:\n\n1. ${GUARD}\n2. Usá exactamente esta especificación:\n\n${L}\n\n3. ${REQS}\n4. Devolvé solo el código de estilos modificado (CSS o tokens), completo y listo para pegar, con una lista de 3 a 5 puntos de qué cambiaste.`;
      case 'cursor':
        return `Aplicá la regla @estilo-${s.id} a los archivos de estilos de este proyecto.\n\n${GUARD}\nSi algún componente tiene colores sueltos, reemplazalos por las variables de la regla. Al terminar, listá los archivos que tocaste.\n\nSi todavía no tenés la regla, descargala en Exportar → Regla de Cursor y guardala como .cursor/rules/estilo-${s.id}.mdc`;
      case 'v0':
        return `Restyleá esta app con la siguiente estética, sin cambiar la estructura ni el contenido.\n\nEstética: ${s.name}. ${s.concept}\n\nTokens (Tailwind + shadcn/ui):\n--background: ${v.bg}\n--card: ${v.surface}\n--foreground: ${v.ink}\n--muted-foreground: ${v.muted}\n--primary: ${v.accent}\n--primary-foreground: ${v['accent-ink']}\n--border: ${v.border}\n--radius: ${v.radius}\n--chart-1: ${v.c1}\n--chart-2: ${v.c2}\n--chart-3: ${v.c3}\n--chart-4: ${v.c4}\n\nTipografía: ${s.type}\nFormas: ${s.shape}\nSuperficies: ${s.surfaces}\nGráficos: ${s.charts}\nEvitá: ${s.avoid}\n\n${REQS}`;
      default:
        throw new Error('Herramienta desconocida: ' + toolId + '. Opciones: ' + Object.keys(g.CATALOG.tools).join(', '));
    }
  }

  /* ---------- Prompt completo del constructor ---------- */
  function fullPrompt(typeId, styleId, stackId, toolId) {
    const t = g.CATALOG.types[typeId], st = g.CATALOG.stacks[stackId], s = style(styleId);
    if (!t) throw new Error('Dashboard desconocido: ' + typeId);
    if (!st) throw new Error('Stack desconocido: ' + stackId);
    const goal = `Construí un dashboard para ${t.purpose}, con datos de ejemplo.`;
    const parts = {
      contenido: `Mostrá: ${t.content}.`,
      layout: `Disposición: ${t.layout}. En celular, todo pasa a una columna en ese mismo orden.`,
      graficos: `Gráficos: ${t.charts}.`,
      stack: st.spec,
      estilo: lookBlock(s),
      requisitos: REQS
    };
    switch (toolId) {
      case 'claude':
        return `<objetivo>\n${goal}\n</objetivo>\n\n<contenido>\n${parts.contenido}\n</contenido>\n\n<disposicion>\n${parts.layout}\n</disposicion>\n\n<graficos>\n${parts.graficos}\n</graficos>\n\n<stack>\n${parts.stack}\n</stack>\n\n<estilo>\n${parts.estilo}\n</estilo>\n\n<requisitos>\n${parts.requisitos}\n</requisitos>\n\n<entrega>\nEmpezá por los tokens del estilo, después la estructura y por último los gráficos. Entregá el código completo.\n</entrega>`;
      case 'grok':
        return `${goal}\n\n1. Contenido. ${parts.contenido}\n2. ${parts.layout}\n3. ${parts.graficos}\n4. Stack: ${parts.stack}\n5. Estilo:\n\n${parts.estilo}\n\n6. ${parts.requisitos}\n7. Devolvé el código completo, sin explicaciones largas.`;
      case 'v0':
        return `${goal}\n\n${parts.contenido}\n\n${parts.layout}\n\n${parts.graficos}\n\nStack: ${parts.stack}\n\nEstética: ${s.concept}\n${parts.estilo.split('\n').slice(2).join('\n')}\n\n${parts.requisitos}`;
      default:
        return `## Objetivo\n${goal}\n\n## Contenido\n${parts.contenido}\n\n## Disposición\n${parts.layout}\n\n## Gráficos\n${parts.graficos}\n\n## Stack\n${parts.stack}\n\n## Estilo\n${parts.estilo}\n\n## Criterios de aceptación\n- ${parts.requisitos}\n- Todos los colores salen de tokens.\n${toolId === 'cursor' ? '- Si existe la regla @estilo-' + s.id + ', respetala.\n' : ''}`;
    }
  }

  /* ---------- Exportaciones ---------- */
  function cssTokens(s) {
    const lines = Object.entries(s.vars).map(([k, v]) => `  --${k}: ${v};`);
    return `/* Promptería · ${s.name} */\n:root {\n${lines.join('\n')}\n}\n`;
  }
  function tailwind(s) {
    const v = s.vars;
    const colors = { background: 'var(--bg)', surface: 'var(--surface)', 'surface-2': 'var(--surface-2)', border: 'var(--border)', ink: 'var(--ink)', muted: 'var(--muted)', accent: { DEFAULT: 'var(--accent)', ink: 'var(--accent-ink)' }, pos: 'var(--pos)', warn: 'var(--warn)', neg: 'var(--neg)', chart: { 1: 'var(--c1)', 2: 'var(--c2)', 3: 'var(--c3)', 4: 'var(--c4)' } };
    const fonts = { sans: v.font.split(',').map((f) => f.replace(/"/g, '').trim()), num: v['font-num'].split(',').map((f) => f.replace(/"/g, '').trim()) };
    return `// Promptería · ${s.name}\n// Importá tokens.css en tu CSS global y sumá esta config.\n/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(colors, null, 2).replace(/\n/g, '\n      ')},\n      borderRadius: { DEFAULT: '${v.radius}' },\n      fontFamily: ${JSON.stringify(fonts).replace(/"/g, "'")}\n    }\n  }\n};\n`;
  }
  function designTokens(s) {
    const v = s.vars, color = {};
    ['bg', 'surface', 'surface-2', 'border', 'ink', 'muted', 'accent', 'accent-ink', 'pos', 'warn', 'neg', 'c1', 'c2', 'c3', 'c4'].forEach((k) => { color[k] = { $value: v[k], $type: 'color' }; });
    return JSON.stringify({
      $description: `Promptería · ${s.name}. ${s.concept}`,
      color,
      font: { body: { $value: v.font, $type: 'fontFamily' }, number: { $value: v['font-num'], $type: 'fontFamily' }, 'number-weight': { $value: Number(v['num-w']), $type: 'fontWeight' } },
      radius: { base: { $value: v.radius, $type: 'dimension' } },
      shadow: { base: { $value: v.shadow, $type: 'shadow' } }
    }, null, 2) + '\n';
  }
  function powerbi(s) {
    const v = s.vars, bg = solid(v.bg, '#000000');
    const S = (c) => solid(c, bg);
    const w = Number(v['num-w']);
    const numFace = /serif/i.test(v['font-num']) && !/sans/i.test(v['font-num']) ? 'Georgia' : w <= 300 ? 'Segoe UI Light' : w >= 700 ? 'Segoe UI Bold' : 'Segoe UI Semibold';
    const fill = (c) => ({ solid: { color: c } });
    return JSON.stringify({
      name: `Promptería · ${s.name}`,
      dataColors: [v.c1, v.c2, v.c3, v.c4, v.pos, v.warn, v.neg, v.muted].map(S),
      background: bg,
      foreground: S(v.ink),
      tableAccent: S(v.accent),
      good: S(v.pos), neutral: S(v.warn), bad: S(v.neg),
      maximum: S(v.c1), center: S(v.c2), minimum: S(v.c3),
      textClasses: {
        callout: { fontSize: 32, fontFace: numFace, color: S(v.ink) },
        title: { fontSize: 13, fontFace: 'Segoe UI Semibold', color: S(v.ink) },
        header: { fontSize: 12, fontFace: 'Segoe UI Semibold', color: S(v.ink) },
        label: { fontSize: 10, fontFace: 'Segoe UI', color: S(v.muted) }
      },
      visualStyles: {
        '*': { '*': {
          background: [{ show: true, color: fill(S(v.surface)), transparency: 0 }],
          border: [{ show: true, color: fill(S(v.border === 'transparent' ? v.surface : v.border)), radius: parseInt(v.radius, 10) || 0 }],
          title: [{ fontColor: fill(S(v.ink)) }]
        } },
        page: { '*': { background: [{ color: fill(bg), transparency: 0 }] } }
      }
    }, null, 2) + '\n';
  }
  function skill(s) {
    return `---\nname: estilo-${s.id}\ndescription: Aplica el estilo visual "${s.name}" de Promptería (${s.concept.replace(/[.:]/g, '').toLowerCase()}) a interfaces y dashboards. Usar cuando pidan el estilo ${s.name}, este look, estos colores o "estilo ${s.id}".\n---\n\n# Estilo ${s.name}\n\n${GUARD}\n\n## Tokens\n\nDefiní estas variables en el CSS global (o mapealas al sistema de tokens del proyecto) y usalas en todos los componentes:\n\n\`\`\`css\n${cssTokens(s).trim()}\n\`\`\`\n\n## Especificación\n\n${lookBlock(s)}\n\n## Cómo aplicarlo\n\n1. Encontrá dónde se definen colores, tipografías y radios (CSS global, tema, tailwind.config).\n2. Reemplazá los valores por los tokens de arriba.\n3. Buscá colores sueltos en componentes y pasalos a variables.\n4. Ajustá gráficos para que usen --c1 a --c4 en orden.\n\n## Antes de terminar\n\n${g.CATALOG.checklist.map((c) => '- [ ] ' + c.text).join('\n')}\n`;
  }
  function agents(s) {
    return `# Estilo visual del proyecto: ${s.name}\n\nCuando toques estilos o componentes visuales, seguí este estilo. ${GUARD}\n\n## Tokens\n\n\`\`\`css\n${cssTokens(s).trim()}\n\`\`\`\n\n## Especificación\n\n${lookBlock(s)}\n\n## Reglas\n\n- Ningún color hex suelto en componentes: siempre variables.\n- ${REQS}\n`;
  }
  function cursorRule(s) {
    return `---\ndescription: Estilo visual ${s.name}: paleta, tipografía, formas y gráficos. Usar al tocar estilos o componentes visuales.\nglobs: "**/*.{css,scss,tsx,jsx,vue,html}"\nalwaysApply: false\n---\n\n# Estilo ${s.name}\n\n${GUARD}\n\n\`\`\`css\n${cssTokens(s).trim()}\n\`\`\`\n\n${lookBlock(s)}\n\n${REQS}\n`;
  }

  const EXPORTS = {
    css: { name: 'Tokens CSS', file: 'tokens.css', build: cssTokens },
    tailwind: { name: 'Tailwind', file: 'tailwind.config.js', build: tailwind },
    tokens: { name: 'Design tokens', file: 'tokens.json', build: designTokens },
    powerbi: { name: 'Tema de Power BI', file: 'powerbi-theme.json', build: powerbi },
    skill: { name: 'Skill de Claude Code', file: 'SKILL.md', build: skill },
    agents: { name: 'AGENTS.md (Codex)', file: 'AGENTS.md', build: agents },
    cursor: { name: 'Regla de Cursor', file: 'estilo.mdc', build: cursorRule }
  };
  function exportFile(styleId, format) {
    const e = EXPORTS[format];
    if (!e) throw new Error('Formato desconocido: ' + format + '. Opciones: ' + Object.keys(EXPORTS).join(', '));
    const s = style(styleId);
    return { filename: format === 'cursor' ? `estilo-${s.id}.mdc` : e.file, content: e.build(s) };
  }

  g.PROMPTERIA = { style, lookBlock, lookPrompt, fullPrompt, exportFile, EXPORTS, GUARD, solid };
})(typeof window !== 'undefined' ? window : globalThis);
