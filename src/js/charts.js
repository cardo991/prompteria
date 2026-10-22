/*
 * Gráficos en SVG puro. Toman los colores de las variables CSS del estilo
 * (--c1..--c4, --pos, --neg, --grid, --track), así que cambian solos al
 * cambiar de estilo.
 */
(function () {
  let uid = 0;
  const nid = (p) => p + (++uid);
  const f = (n) => n.toFixed(1);
  const C = ['var(--c1)', 'var(--c2)', 'var(--c3)', 'var(--c4)'];

  function smooth(p) {
    let d = `M${f(p[0][0])},${f(p[0][1])}`;
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      d += ` C${f(p1[0] + (p2[0] - p0[0]) / 6)},${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)},${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])},${f(p2[1])}`;
    }
    return d;
  }
  function yScale(all, top, bottom) {
    const mx = Math.max(...all), mn = Math.min(...all), r = (mx - mn) || 1;
    return (v) => top + (bottom - top) * (1 - (v - mn) / r);
  }
  function gridLines(w, top, bottom, n = 3) {
    let s = '';
    for (let i = 0; i <= n; i++) { const y = top + (bottom - top) * i / n; s += `<line class="ch-grid" x1="0" x2="${w}" y1="${f(y)}" y2="${f(y)}"/>`; }
    return s;
  }
  function xLabels(labels, w, h, pad) {
    if (!labels || !labels.length) return '';
    return labels.map((l, i) => {
      const x = pad + (w - 2 * pad) * (labels.length === 1 ? 0.5 : i / (labels.length - 1));
      return `<text class="ch-lab" x="${f(x)}" y="${h - 4}" text-anchor="middle">${l}</text>`;
    }).join('');
  }
  const svg = (w, h, body, label, natural) => `<svg class="chart" viewBox="0 0 ${w} ${h}"${natural ? ` width="${w}" height="${h}"` : ''} role="img" aria-label="${label || ''}">${body}</svg>`;

  /* Línea con área (una o varias series) */
  function lines(series, o = {}) {
    const w = o.w || 640, h = o.h || 240, pad = 14, top = 12, bottom = h - (o.labels ? 28 : 10);
    const all = series.flatMap((s) => s.data);
    const shared = yScale(all, top, bottom);
    let defs = '', body = gridLines(w, top, bottom);
    series.forEach((s, k) => {
      const col = s.color || C[k];
      const sy = o.independent ? yScale(s.data, top + k * 18, bottom - 10) : shared;
      const pts = s.data.map((v, i) => [pad + (w - 2 * pad) * i / (s.data.length - 1), sy(v)]);
      const d = smooth(pts);
      if (o.area !== false && k === 0) {
        const g = nid('ga');
        defs += `<linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:${col};stop-opacity:.35"/><stop offset="1" style="stop-color:${col};stop-opacity:0"/></linearGradient>`;
        body += `<path class="ch-area" d="${d} L${f(pts[pts.length - 1][0])},${bottom} L${f(pts[0][0])},${bottom} Z" fill="url(#${g})"/>`;
      }
      body += `<path class="ch-line" d="${d}" style="stroke:${col}"/>`;
      const last = pts[pts.length - 1];
      if (k === 0) body += `<circle class="ch-dot" cx="${f(last[0])}" cy="${f(last[1])}" r="5" style="fill:${col}"/>`;
    });
    body += xLabels(o.labels, w, h, pad);
    return svg(w, h, `<defs>${defs}</defs>${body}`, o.label);
  }

  /* Barras verticales */
  function bars(data, o = {}) {
    const w = o.w || 640, h = o.h || 240, top = 10, bottom = h - (o.labels ? 28 : 6);
    const mx = Math.max(...data) || 1, n = data.length, gap = o.gap ?? 0.38, bw = (w / n) * (1 - gap);
    let body = gridLines(w, top, bottom);
    data.forEach((v, i) => {
      const bh = (bottom - top) * v / mx, x = (w / n) * i + (w / n - bw) / 2;
      const hi = o.hi === i || (o.hiMax && v === mx);
      body += `<rect class="ch-bar${hi ? ' hi' : ''}" x="${f(x)}" y="${f(bottom - bh)}" width="${f(bw)}" height="${f(Math.max(bh, 2))}" style="--d:${i * 30}ms"/>`;
    });
    if (o.labels) body += o.labels.map((l, i) => `<text class="ch-lab" x="${f((w / n) * i + w / n / 2)}" y="${h - 6}" text-anchor="middle">${l}</text>`).join('');
    return svg(w, h, body, o.label);
  }

  /* Dona */
  function donut(items, o = {}) {
    const s = 200, r = 74, total = items.reduce((a, b) => a + b.value, 0);
    let acc = 0, body = `<circle cx="100" cy="100" r="${r}" fill="none" stroke="var(--track)" stroke-width="22"/>`;
    items.forEach((it, i) => {
      const len = it.value / total * 100;
      body += `<circle class="ch-seg" cx="100" cy="100" r="${r}" fill="none" stroke="${it.color || C[i % 4]}" stroke-width="22" pathLength="100" stroke-dasharray="${f(Math.max(len - 1.2, 0.1))} 100" stroke-dashoffset="${f(-acc)}" transform="rotate(-90 100 100)"/>`;
      acc += len;
    });
    if (o.center) body += `<text class="ch-cv" x="100" y="102" text-anchor="middle">${o.center}</text>`;
    if (o.sub) body += `<text class="ch-cs" x="100" y="128" text-anchor="middle">${o.sub}</text>`;
    return svg(s, s, body, o.label);
  }

  /* Velas */
  function candles(ohlc, o = {}) {
    const w = o.w || 720, h = o.h || 300, top = 10, bottom = h - 10;
    const sy = yScale(ohlc.flatMap((c) => [c[1], c[2]]), top, bottom);
    const n = ohlc.length, cw = w / n, bw = cw * 0.56;
    let body = gridLines(w, top, bottom, 4);
    ohlc.forEach((c, i) => {
      const [op, hi, lo, cl] = c, up = cl >= op, x = cw * i + cw / 2;
      const col = up ? 'var(--pos)' : 'var(--neg)';
      body += `<line x1="${f(x)}" x2="${f(x)}" y1="${f(sy(hi))}" y2="${f(sy(lo))}" style="stroke:${col}" stroke-width="1.5"/>`;
      const y1 = sy(Math.max(op, cl)), y2 = sy(Math.min(op, cl));
      body += `<rect class="ch-candle" x="${f(x - bw / 2)}" y="${f(y1)}" width="${f(bw)}" height="${f(Math.max(y2 - y1, 1.5))}" rx="1.5" style="fill:${col}"/>`;
    });
    const last = ohlc[n - 1][3];
    body += `<line class="ch-now" x1="0" x2="${w}" y1="${f(sy(last))}" y2="${f(sy(last))}"/>`;
    return svg(w, h, body, o.label);
  }

  /* Sparkline */
  function spark(data, o = {}) {
    const w = o.w || 140, h = o.h || 44, sy = yScale(data, 4, h - 4);
    const pts = data.map((v, i) => [2 + (w - 4) * i / (data.length - 1), sy(v)]);
    const col = o.color || 'var(--c1)';
    return svg(w, h, `<path class="ch-line thin" d="${smooth(pts)}" style="stroke:${col}"/>`, o.label);
  }

  /* Anillos de actividad */
  function rings(vals, o = {}) {
    const s = 220; let body = '';
    vals.forEach((v, i) => {
      const r = 92 - i * 26;
      body += `<circle cx="110" cy="110" r="${r}" fill="none" stroke="var(--track)" stroke-width="20"/>`;
      body += `<circle class="ch-ring" cx="110" cy="110" r="${r}" fill="none" stroke="${C[i]}" stroke-width="20" stroke-linecap="round" pathLength="100" stroke-dasharray="${f(Math.min(v, 99.5))} 100" transform="rotate(-90 110 110)"/>`;
    });
    return svg(s, s, body, o.label);
  }

  /* Embudo */
  function funnel(steps, o = {}) {
    const w = 360, rowH = 78, h = steps.length * rowH, mx = steps[0].value;
    let body = '';
    steps.forEach((s, i) => {
      const share = Math.sqrt(s.value / mx), bw = Math.max(w * share, w * 0.16), x = (w - bw) / 2, y = i * rowH;
      const pct = i ? Math.round(s.value / steps[i - 1].value * 100) + '%' : '';
      body += `<text class="ch-fl" x="0" y="${y + 18}">${s.label}</text><text class="ch-fv" x="${w}" y="${y + 18}" text-anchor="end">${s.value.toLocaleString('es-AR')}${pct ? ' · ' + pct : ''}</text>`;
      body += `<rect class="ch-fun" x="${f(x)}" y="${y + 28}" width="${f(bw)}" height="34" rx="10" style="fill:${C[0]};opacity:${f(1 - i * 0.18)}"/>`;
    });
    return svg(w, h, body, o.label);
  }

  /* Mapa de calor */
  function heat(rows, o = {}) {
    const cell = o.cell || 26, gap = 5, cols = rows[0].length;
    const w = cols * (cell + gap), h = rows.length * (cell + gap);
    const mx = Math.max(...rows.flat()) || 1;
    let body = '';
    rows.forEach((r, y) => r.forEach((v, x) => {
      body += `<rect x="${x * (cell + gap)}" y="${y * (cell + gap)}" width="${cell}" height="${cell}" rx="${o.round ? cell / 2 : 6}" style="fill:${v ? 'var(--c1)' : 'var(--track)'};opacity:${v ? f(0.18 + 0.82 * v / mx) : 1}"/>`;
      if (o.values && v) body += `<text class="ch-hv" x="${x * (cell + gap) + cell / 2}" y="${y * (cell + gap) + cell / 2 + 4}" text-anchor="middle">${v}</text>`;
    }));
    return svg(w, h, body, o.label, true);
  }

  /* Gauge de arco */
  function gauge(pct, o = {}) {
    const g = nid('gg');
    const a = (144 + 252 * pct / 100) * Math.PI / 180;
    return svg(120, 104, `<defs><linearGradient id="${g}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" style="stop-color:var(--c3)"/><stop offset=".55" style="stop-color:var(--c2)"/><stop offset="1" style="stop-color:var(--c1)"/></linearGradient></defs>
      <circle cx="60" cy="60" r="46" fill="none" stroke="var(--track)" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="70 100" transform="rotate(144 60 60)"/>
      <circle class="ch-arc" cx="60" cy="60" r="46" fill="none" stroke="url(#${g})" stroke-width="9" stroke-linecap="round" pathLength="100" stroke-dasharray="${f(70 * pct / 100)} 100" transform="rotate(144 60 60)"/>
      <circle cx="${f(60 + 46 * Math.cos(a))}" cy="${f(60 + 46 * Math.sin(a))}" r="5.5" fill="var(--hero-ink)" stroke="var(--c1)" stroke-width="3"/>`, o.label);
  }

  window.Charts = { lines, bars, donut, candles, spark, rings, funnel, heat, gauge, C };
})();
