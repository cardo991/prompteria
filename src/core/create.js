/*
 * Generador de estilos: a partir de un color de marca arma un estilo completo
 * de Promptería (paleta, tipografía, formas y textos del prompt), con contraste
 * AA garantizado para el texto. Lo usan la web, la CLI y el MCP server.
 */
(function (g) {
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  function hexToRgb(h) {
    h = String(h).trim().replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    if (!/^[0-9a-f]{6}$/i.test(h)) throw new Error('Color inválido: usá un hex como #0F766E');
    return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  }
  const toHex = (r) => '#' + r.map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0')).join('').toUpperCase();
  function rgbToHsl([r, gg, b]) {
    r /= 255; gg /= 255; b /= 255;
    const mx = Math.max(r, gg, b), mn = Math.min(r, gg, b), l = (mx + mn) / 2;
    if (mx === mn) return [0, 0, l * 100];
    const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    let h = mx === r ? (gg - b) / d + (gg < b ? 6 : 0) : mx === gg ? (b - r) / d + 2 : (r - gg) / d + 4;
    return [h * 60, s * 100, l * 100];
  }
  function hsl(h, s, l) {
    h = ((h % 360) + 360) % 360; s = clamp(s, 0, 100) / 100; l = clamp(l, 0, 100) / 100;
    const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
    const f = (n) => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
    return toHex([f(0) * 255, f(8) * 255, f(4) * 255]);
  }
  function lum(hex) { return hexToRgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0); }
  function contrast(a, b) { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
  /* Mueve la luminosidad hasta que el color contraste al menos `min` contra el fondo. */
  function ensure(hex, bg, min, dark) {
    let [h, s, l] = rgbToHsl(hexToRgb(hex)), out = hex, i = 0;
    while (contrast(out, bg) < min && i++ < 60) { l += dark ? 1.5 : -1.5; out = hsl(h, s, l); }
    return out;
  }
  const slug = (t) => String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'mi-estilo';

  function createStyle(opts) {
    const o = Object.assign({ name: 'Mi marca', mode: 'dark', font: 'Inter', radius: 20 }, opts || {});
    const primary = toHex(hexToRgb(o.primary || '#2F6BFF'));
    const [h, s] = rgbToHsl(hexToRgb(primary));
    const dark = o.mode !== 'light';
    const sat = clamp(s, 25, 90);
    const v = dark ? {
      bg: hsl(h, 10, 7), surface: hsl(h, 9, 10.5), 'surface-2': hsl(h, 9, 14), border: hsl(h, 9, 18),
      ink: hsl(h, 14, 93), muted: hsl(h, 7, 62)
    } : {
      bg: hsl(h, 16, 95), surface: '#FFFFFF', 'surface-2': hsl(h, 18, 97.5), border: hsl(h, 12, 88),
      ink: hsl(h, 28, 10), muted: hsl(h, 9, 38)
    };
    v.ink = ensure(v.ink, v.bg, 7, dark);
    v.muted = ensure(v.muted, v.bg, 4.6, dark);
    v.accent = dark ? ensure(primary, v.bg, 3, true) : ensure(primary, v.bg, 3, false);
    v['accent-ink'] = contrast('#FFFFFF', v.accent) >= contrast('#0B0B0F', v.accent) ? '#FFFFFF' : hsl(h, 30, 8);
    v.pos = ensure(dark ? '#4ADE80' : '#15803D', v.bg, 3, dark);
    v.warn = ensure(dark ? '#FBBF24' : '#B45309', v.bg, 3, dark);
    v.neg = ensure(dark ? '#F87171' : '#DC2626', v.bg, 3, dark);
    const second = o.secondary ? toHex(hexToRgb(o.secondary)) : hsl(h + 32, sat * 0.85, dark ? 70 : 52);
    v.c1 = v.accent; v.c2 = ensure(second, v.bg, 2.2, dark); v.c3 = hsl(h - 38, sat * 0.75, dark ? 74 : 44); v.c4 = hsl(h + 180, sat * 0.45, dark ? 62 : 48);
    v['bg-img'] = dark ? `radial-gradient(circle at 100% 0, ${hsl(h, sat * 0.6, 14)} 0, transparent 42%)` : 'none';
    v.hero = dark
      ? `radial-gradient(circle at 90% 10%, ${hsl(h, sat, 30)} 0, transparent 55%), radial-gradient(circle at 10% 110%, ${hsl(h + 40, sat * 0.6, 22)} 0, transparent 55%), ${hsl(h, 14, 12)}`
      : `radial-gradient(circle at 100% 0, ${primary} 0, transparent 50%), ${hsl(h, 30, 10)}`;
    v['hero-ink'] = dark ? v.ink : '#FFFFFF';
    v['hero-muted'] = dark ? hsl(h, 10, 76) : hsl(h, 12, 76);
    v['card-bg'] = `linear-gradient(135deg, ${hsl(h, sat, dark ? 42 : 40)} 0, ${hsl(h + 30, sat * 0.8, dark ? 24 : 22)} 100%)`;
    v.grid = dark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.06)';
    v.track = dark ? 'rgba(255,255,255,.1)' : hsl(h, 14, 92);
    v.font = `"${o.font}", system-ui, sans-serif`; v['font-num'] = v.font;
    v['num-w'] = dark ? '300' : '700'; v['num-ls'] = dark ? '-0.02em' : '-0.03em'; v['num-scale'] = '1'; v['num-style'] = 'normal';
    v.radius = clamp(Number(o.radius) || 20, 0, 40) + 'px';
    v.shadow = dark ? 'none' : '0 1px 2px rgba(0,0,0,.05), 0 8px 24px -12px rgba(0,0,0,.12)';
    v.blur = '0px';
    const tone = dark ? 'oscuro' : 'claro';
    return {
      id: slug(o.id || o.name), name: o.name,
      swatch: `linear-gradient(135deg, ${v.bg} 50%, ${v.accent} 50%)`,
      concept: `Estilo ${tone} construido alrededor del color de marca ${primary}.`,
      vars: Object.fromEntries(['bg', 'bg-img', 'surface', 'surface-2', 'border', 'ink', 'muted', 'accent', 'accent-ink', 'pos', 'warn', 'neg', 'c1', 'c2', 'c3', 'c4', 'hero', 'hero-ink', 'hero-muted', 'card-bg', 'grid', 'track', 'font', 'font-num', 'num-w', 'num-ls', 'num-scale', 'num-style', 'radius', 'shadow', 'blur'].map((k) => [k, v[k]])),
      type: `${o.font}. Números grandes en peso ${v['num-w']} con tracking ${v['num-ls']}; títulos en 600; textos secundarios en 400.`,
      shape: `Radio ${v.radius} en paneles y un poco más en el panel protagonista; píldoras totalmente redondeadas. ${dark ? 'Bordes de 1px sutiles, sin sombras.' : 'Bordes suaves y una sombra corta y difusa.'}`,
      surfaces: dark ? `Superficies planas sobre fondo ${v.bg}. El panel protagonista lleva un resplandor difuso del color de marca.` : `Fondo ${v.bg} con paneles blancos. El panel protagonista va invertido: oscuro con un resplandor del color de marca y texto blanco.`,
      components: `Botón primario relleno con ${v.accent} y texto ${v['accent-ink']}; secundarios con fondo de superficie y borde. El activo de chips y filtros, relleno con el acento.`,
      charts: `Series en este orden: ${v.c1}, ${v.c2}, ${v.c3}, ${v.c4}. Líneas de 2,5px con relleno degradé muy suave, barras al 35% con la destacada sólida, grilla casi invisible.`,
      details: 'El color de marca se usa para una sola cosa: la acción principal o el dato destacado.',
      avoid: 'Más de un acento fuerte, texto con poco contraste, sombras grises duras.',
      generated: { primary, secondary: o.secondary || null, mode: dark ? 'dark' : 'light' }
    };
  }

  g.createStyle = createStyle;
  g.PROMPTERIA_COLOR = { contrast, hsl, hexToRgb, toHex, rgbToHsl, slug };
})(typeof window !== 'undefined' ? window : globalThis);
