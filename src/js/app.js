/* Promptería: une galería, prompts, constructor, exportaciones, recetario y recursos. */
(function () {
  const $ = (s) => document.querySelector(s);
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const C = window.CATALOG, P = window.PROMPTERIA;
  const state = { type: 'billetera', style: 'aurora', tool: 'claude', format: 'css', cType: 'billetera', cStack: 'react', cTool: 'claude' };
  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem('prompteria:' + k)); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('prompteria:' + k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };

  const [ht, hs] = location.hash.slice(1).split('-');
  if (DASHBOARDS[ht]) state.type = ht;
  if (STYLES.some((s) => s.id === hs)) state.style = hs;

  /* ---------- Utilidades ---------- */
  function chips(el, items, current, onPick, withSwatch) {
    el.innerHTML = items.map((it) => `<button type="button" class="chip" data-id="${it.id}" aria-pressed="${it.id === current}">${withSwatch ? `<span class="sw" style="background:${it.swatch}"></span>` : ''}${it.name}</button>`).join('');
    el.addEventListener('click', (e) => { const b = e.target.closest('.chip'); if (b) onPick(b.dataset.id, e); });
  }
  const press = (el, id) => el.querySelectorAll('.chip').forEach((c) => c.setAttribute('aria-pressed', c.dataset.id === id));
  const options = (sel, obj, cur) => { sel.innerHTML = Object.entries(obj).map(([k, v]) => `<option value="${k}"${k === cur ? ' selected' : ''}>${v.name}</option>`).join(''); };
  const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  async function copyFrom(sel, btn) {
    const el = $(sel), t = el.textContent, label = btn.textContent;
    let ok = false;
    try { await navigator.clipboard.writeText(t); ok = true; } catch (e) {
      const r = document.createRange(); r.selectNodeContents(el);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
    }
    btn.textContent = ok ? 'Copiado' : 'Seleccioná el texto y copialo';
    setTimeout(() => (btn.textContent = label), 1800);
  }
  document.addEventListener('click', (e) => { const b = e.target.closest('.copy'); if (b) copyFrom(b.dataset.copy, b); });

  function download(name, content) {
    const type = name.endsWith('.json') ? 'application/json' : name.endsWith('.css') ? 'text/css' : name.endsWith('.js') ? 'text/javascript' : 'text/markdown';
    const url = URL.createObjectURL(new Blob([content], { type: type + ';charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = name; document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  /* ---------- Estilo global ---------- */
  function applyStyle(id) {
    const s = STYLES.find((x) => x.id === id);
    for (const [k, v] of Object.entries(s.vars)) root.style.setProperty('--' + k, v);
    root.dataset.style = s.id;
    $('meta[name="theme-color"]').content = s.vars.bg;
    renderPrompt(); renderBuild(); renderExport(); renderRecipes();
  }
  function pickStyle(id, e) {
    if (id === state.style) return;
    state.style = id; press($('#styles'), id); syncHash();
    if (!document.startViewTransition || reduce) return applyStyle(id);
    const x = e?.clientX ?? innerWidth / 2, y = e?.clientY ?? 0;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyStyle(id));
    vt.ready.then(() => root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] }, { duration: 750, easing: 'cubic-bezier(.7,0,.2,1)', pseudoElement: '::view-transition-new(root)' }));
  }
  const syncHash = () => history.replaceState(null, '', `#${state.type}-${state.style}`);

  /* ---------- Galería ---------- */
  function pickType(id) { if (id === state.type) return; state.type = id; press($('#types'), id); syncHash(); $('#dash').innerHTML = DASHBOARDS[id].render(); }

  /* ---------- Prompts por herramienta ---------- */
  function renderTabs() {
    $('#toolTabs').innerHTML = Object.entries(C.tools).map(([k, t]) => `<button type="button" role="tab" class="tab" data-id="${k}" aria-selected="${k === state.tool}">${t.name}</button>`).join('');
    $('#toolTabs').addEventListener('click', (e) => { const b = e.target.closest('.tab'); if (!b) return; state.tool = b.dataset.id; $('#toolTabs').querySelectorAll('.tab').forEach((x) => x.setAttribute('aria-selected', x === b)); renderPrompt(); });
  }
  function renderPrompt() { $('#toolTip').textContent = C.tools[state.tool].tip; $('#promptOut').textContent = P.lookPrompt(state.style, state.tool); }

  /* ---------- Constructor ---------- */
  function renderBuild() { $('#buildOut').textContent = P.fullPrompt(state.cType, state.style, state.cStack, state.cTool); }
  function initBuild() {
    options($('#cType'), C.types, state.cType); options($('#cStack'), C.stacks, state.cStack); options($('#cTool'), C.tools, state.cTool);
    [['#cType', 'cType'], ['#cStack', 'cStack'], ['#cTool', 'cTool']].forEach(([sel, key]) => $(sel).addEventListener('change', (e) => { state[key] = e.target.value; renderBuild(); }));
  }

  /* ---------- Exportar ---------- */
  function initExport() {
    $('#exGrid').innerHTML = Object.entries(P.EXPORTS).map(([k, e]) => `<button type="button" class="excard" data-id="${k}" aria-pressed="${k === state.format}"><b>${e.name}</b><span>${k === 'cursor' ? 'estilo-&lt;id&gt;.mdc' : e.file}</span></button>`).join('');
    $('#exGrid').addEventListener('click', (e) => { const b = e.target.closest('.excard'); if (!b) return; state.format = b.dataset.id; $('#exGrid').querySelectorAll('.excard').forEach((x) => x.setAttribute('aria-pressed', x === b)); renderExport(); });
    $('#pbiDownload').addEventListener('click', () => { const f = P.exportFile(state.style, 'powerbi'); download(P.style(state.style).id + '-powerbi-theme.json', f.content); });
    $('#exDownload').addEventListener('click', () => { const f = P.exportFile(state.style, state.format); download(f.filename, f.content); });
  }
  function renderExport() { const theme = JSON.parse(P.exportFile(state.style, 'powerbi').content); $('#pbiName').textContent = theme.name; $('#pbiPalette').replaceChildren(...theme.dataColors.map((color, i) => { const swatch = document.createElement('span'); swatch.style.backgroundColor = color; swatch.title = `Serie ${i + 1}: ${color}`; swatch.setAttribute('aria-label', swatch.title); return swatch; })); const f = P.exportFile(state.style, state.format); $('#exName').textContent = f.filename; $('#exOut').textContent = f.content; }

  /* ---------- Recetario de gráficos ---------- */
  function recipeSvg(label, content) {
    return `<svg viewBox="0 0 360 190" width="100%" role="img" aria-label="${label}" style="font:11px system-ui;fill:var(--muted)">${content}</svg>`;
  }
  const SAMPLE = {
    ranking: () => recipeSvg('Ranking de ventas por región', ['Norte', 'Centro', 'Sur', 'Oeste'].map((n,i) => `<text x="0" y="${30+i*40}">${n}</text><rect x="58" y="${16+i*40}" width="${[240,185,140,90][i]}" height="22" rx="4" fill="var(--c${i===0?2:1})"/><text x="${[306,251,206,156][i]}" y="${31+i*40}">${[120,92,70,45][i]}</text>`).join('')),
    apiladas: () => recipeSvg('Composición por canal: Web, Tienda y App', [0,1,2].map((i) => { const v=[[50,30,20],[25,45,30],[35,20,45]][i]; let x=60; return `<text x="0" y="${32+i*43}">Grupo ${i+1}</text>`+v.map((n,j) => { const a=x; x+=n*2.7; return `<rect x="${a}" y="${16+i*43}" width="${n*2.7}" height="25" fill="var(--c${j+1})"/>`; }).join(''); }).join('')+'<text x="60" y="166">Web · Tienda · App (mismo orden)</text>'),
    dispersion: () => recipeSvg('Inversión y ventas, en miles', '<path d="M35 10V155H345" fill="none" stroke="var(--grid)"/>'+[[50,135],[75,115],[110,125],[135,90],[165,100],[190,70],[220,85],[250,48],[290,60],[320,20]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="6" fill="var(--c1)" opacity=".75"/>`).join('')+'<text x="35" y="181">Inversión (miles) →</text><text x="40" y="14">Ventas (miles)</text>'),
    cascada: () => recipeSvg('Saldo: 100 más 40 menos 25 menos 15 igual a 100', '<path d="M20 155H345" stroke="var(--grid)"/>'+[[25,55,100,'c1','100','Inicio'],[90,15,40,'pos','+40','Ventas'],[155,15,25,'neg','−25','Costos'],[220,40,15,'neg','−15','Otros'],[285,55,100,'c1','100','Final']].map(([x,y,h,c,v,l]) => `<rect x="${x}" y="${y}" width="40" height="${h}" fill="var(--${c})"/><text x="${x}" y="${y-4}">${v}</text><text x="${x}" y="175">${l}</text>`).join('')+'<path d="M65 55H90M130 15H155M195 40H220M260 55H285" fill="none" stroke="var(--muted)" stroke-dasharray="3 3"/>'),
    pareto: () => recipeSvg('Pareto: cantidades 50, 25, 15 y 10; acumulado 50, 75, 90 y 100 por ciento', '<text x="10" y="12">Cantidad</text><text x="275" y="12">Acum. %</text><path d="M30 25V155H320V25" fill="none" stroke="var(--grid)"/>'+[50,25,15,10].map((v,i) => `<rect x="${45+i*65}" y="${155-v*2.2}" width="36" height="${v*2.2}" fill="var(--c1)"/><text x="${55+i*65}" y="174">${String.fromCharCode(65+i)}</text>`).join('')+'<path d="M30 51H320" stroke="var(--muted)" stroke-dasharray="4 4"/><text x="324" y="55">80%</text><path d="M63 90L128 57.5L193 38L258 25" fill="none" stroke="var(--c2)" stroke-width="3"/><text x="270" y="28">100%</text>'),
    bala: () => recipeSvg('Resultado y meta, en porcentaje de cumplimiento', [0,1,2].map((i) => `<text x="0" y="${30+i*50}">${['Ventas','Margen','Retención'][i]}</text><rect x="70" y="${12+i*50}" width="240" height="28" fill="var(--track)"/><rect x="70" y="${12+i*50}" width="160" height="28" fill="var(--muted)" opacity=".15"/><rect x="70" y="${20+i*50}" width="${[190,145,215][i]}" height="12" fill="var(--c1)"/><path d="M270 ${8+i*50}v36" stroke="var(--ink)" stroke-width="3"/>`).join('')+'<text x="70" y="181">Barra: resultado · Marca: meta (100%)</text>'),
    area: () => Charts.lines([{ data: [40, 42, 41, 46, 44, 49, 52, 50, 57, 61, 59, 66] }], { h: 180, label: 'Ejemplo de área' }),
    barras: () => Charts.bars([12, 26, 34, 52, 61, 48, 72, 44], { h: 180, hi: 6, label: 'Ejemplo de barras' }),
    dona: () => `<div class="donut-wrap sm">${Charts.donut([{ label: 'A', value: 46 }, { label: 'B', value: 24 }, { label: 'C', value: 18 }, { label: 'D', value: 12 }], { center: '62k', sub: 'total', label: 'Ejemplo de dona' })}</div>`,
    velas: () => Charts.candles([[100, 104, 98, 103], [103, 106, 101, 102], [102, 103, 97, 98], [98, 101, 96, 100], [100, 107, 99, 106], [106, 109, 104, 105], [105, 106, 100, 101], [101, 108, 100, 107], [107, 111, 106, 110], [110, 112, 105, 106]], { h: 180, label: 'Ejemplo de velas' }),
    anillos: () => `<div class="donut-wrap sm">${Charts.rings([84, 66, 92], { label: 'Ejemplo de anillos' })}</div>`,
    embudo: () => Charts.funnel([{ label: 'Visitas', value: 4890 }, { label: 'Carrito', value: 640 }, { label: 'Compra', value: 186 }], { label: 'Ejemplo de embudo' }),
    calor: () => `<div class="heat-wrap">${Charts.heat([[0, 3, 7, 2, 9, 0, 5, 8, 4, 0], [6, 0, 4, 9, 3, 7, 0, 2, 8, 5], [2, 8, 0, 5, 6, 4, 9, 0, 3, 7]], { cell: 22, label: 'Ejemplo de mapa de calor' })}</div>`,
    gauge: () => `<div class="g" style="max-width:180px;margin:0 auto">${Charts.gauge(62, { label: 'Ejemplo de gauge' })}<div class="gv"><b class="num md">62%</b></div></div>`
  };
  function renderRecipes() {
    $('#recipes').innerHTML = C.charts.map((c, i) => `<article class="card recipe"><div class="recipe-viz">${SAMPLE[c.id]()}</div><h3>${c.name}</h3><p class="tip">${c.when}</p><div class="code"><button class="btn copy" type="button" data-copy="#rc-${c.id}">Copiar</button><pre id="rc-${c.id}">${esc(c.prompt)}</pre></div></article>`).join('');
  }

  /* ---------- Comparar ---------- */
  function renderCompare() {
    const list = window.COMPARISONS || [];
    if (!list.length) {
      $('#cmp').innerHTML = `<div class="card empty"><h3>Todavía no hay comparaciones</h3><ol><li>Elegí dashboard, estilo y stack en el Constructor.</li><li>Corré el mismo prompt en cada herramienta, sin retoques.</li><li>Guardá una captura de cada resultado en <code>comparaciones/img/</code>.</li><li>Sumá la entrada en <code>comparaciones/comparaciones.js</code>.</li></ol><p class="tip">El paso a paso completo está en <code>docs/comparar-modelos.md</code>.</p></div>`;
      return;
    }
    $('#cmp').innerHTML = list.map((c) => `<article class="card cmp"><h3>${C.types[c.dashboard]?.name || c.dashboard} con ${STYLES.find((s) => s.id === c.style)?.name || c.style}</h3><p class="tip">${C.stacks[c.stack]?.name || c.stack} · ${c.date}</p><div class="cmp-grid">${c.results.map((r) => `<figure><img src="${r.img}" alt="Resultado de ${r.tool}" loading="lazy"><figcaption><b>${r.tool}</b> ${r.model ? `<small>${r.model}</small>` : ''}<p>${r.notes || ''}</p></figcaption></figure>`).join('')}</div></article>`).join('');
  }

  /* ---------- Recursos ---------- */
  function renderResources() {
    $('#res').innerHTML = C.resources.map((g) => `<div class="card"><h3>${g.group}</h3><ul class="links">${g.items.map((i) => `<li><a href="${i.url}" target="_blank" rel="noopener">${i.name}</a><span>${i.why}</span></li>`).join('')}</ul></div>`).join('');
  }



  /* ---------- Creá tu estilo ---------- */
  function initCreate() {
    const q = (id) => $('#' + id);
    let last = null;
    const quote = (t) => '"' + String(t).replace(/"/g, '') + '"';
    function render() {
      let hex = q('crPrimaryHex').value.trim(); if (!hex.startsWith('#')) hex = '#' + hex;
      if (!/^#[0-9a-f]{6}$/i.test(hex)) { q('crContrast').textContent = 'Escribí un color en hex, por ejemplo #0F766E.'; return; }
      const opts = { name: q('crName').value.trim() || 'Mi marca', primary: hex, mode: q('crMode').value };
      if (q('crUse2').checked) opts.secondary = q('crSecondary').value;
      const st = createStyle(opts); last = st;
      const v = st.vars, C = PROMPTERIA_COLOR;
      q('crPalette').innerHTML = [['Fondo', v.bg], ['Superficie', v.surface], ['Texto', v.ink], ['Acento', v.accent], ['Serie 2', v.c2], ['Serie 3', v.c3]].map((p) => `<div><i style="background:${p[1]}"></i><span>${p[0]}<br>${p[1]}</span></div>`).join('');
      q('crContrast').textContent = `Contraste del texto ${C.contrast(v.ink, v.bg).toFixed(1)}:1 y del texto secundario ${C.contrast(v.muted, v.bg).toFixed(1)}:1 (AA pide 4,5:1).`;
      q('crCmd').textContent = `npx prompteria create --name ${quote(st.name)} --primary "${st.generated.primary}"${opts.secondary ? ` --secondary "${opts.secondary.toUpperCase()}"` : ''} --mode ${st.generated.mode}`;
      q('crPrompt').textContent = P.lookPrompt(st, 'claude');
    }
    q('crPrimary').addEventListener('input', () => { q('crPrimaryHex').value = q('crPrimary').value.toUpperCase(); render(); });
    q('crPrimaryHex').addEventListener('input', () => { const v = q('crPrimaryHex').value.trim(); if (/^#?[0-9a-f]{6}$/i.test(v)) q('crPrimary').value = v.startsWith('#') ? v : '#' + v; render(); });
    ['crName', 'crMode', 'crSecondary', 'crUse2'].forEach((id) => q(id).addEventListener('input', render));
    q('crMode').addEventListener('change', render);
    q('crApply').addEventListener('click', (e) => {
      if (!last) return;
      const st = Object.assign({}, last, { id: 'tu-' + last.id });
      const i = STYLES.findIndex((x) => x.id.startsWith('tu-'));
      if (i >= 0) STYLES.splice(i, 1, st); else STYLES.push(st);
      $('#styles').innerHTML = '';
      const fresh = $('#styles').cloneNode(false); $('#styles').replaceWith(fresh);
      chips(fresh, STYLES, state.style, pickStyle, true);
      state.style = ''; pickStyle(st.id, e); press(fresh, st.id);
      fresh.lastElementChild.scrollIntoView({ inline: 'end', block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
    });
    q('crJson').addEventListener('click', () => { if (last) download(last.id + '-powerbi-theme.json', P.EXPORTS.powerbi.build(last)); });
    render();
  }

  /* ---------- Hero: el dashboard cambia de estilo solo ---------- */
  function initHero() {
    const stage = $('#hvStage'); if (!stage) return;
    const html = DASHBOARDS.billetera.render();
    const mk = () => { const d = document.createElement('div'); d.className = 'hv'; d.innerHTML = '<div class="hv-in">' + html + '</div>'; stage.append(d); return d; };
    const a = mk(), b = mk();
    const paint = (el, id) => { const s = STYLES.find((x) => x.id === id); for (const [k, v] of Object.entries(s.vars)) el.style.setProperty('--' + k, v); el.dataset.style = id; };
    const fit = () => { const sc = stage.clientWidth / 1240; stage.querySelectorAll('.hv-in').forEach((n) => (n.style.transform = 'scale(' + sc + ')')); };
    addEventListener('resize', fit); fit();
    let i = 0, cur = STYLES[0].id, visible = true, timer = null;
    paint(a, cur); b.style.visibility = 'hidden';
    const name = () => ($('#hvName').textContent = STYLES.find((x) => x.id === cur).name);
    name();
    function step() {
      if (!visible || document.hidden) return;
      i = (i + 1) % STYLES.length; const next = STYLES[i].id;
      paint(b, next); b.style.visibility = 'visible'; cur = next; name();
      const done = () => { paint(a, next); b.style.visibility = 'hidden'; };
      if (reduce) return done();
      const anim = b.animate({ clipPath: ['circle(0% at 85% 12%)', 'circle(150% at 85% 12%)'] }, { duration: 900, easing: 'cubic-bezier(.7,0,.2,1)' });
      anim.onfinish = done;
    }
    if (!reduce) timer = setInterval(step, 2600);
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; }).observe(stage);
    $('#hvUse').addEventListener('click', (e) => { pickStyle(cur, e); press($('#styles'), cur); });
    if (reduce) { $('#hvUse').textContent = 'Usar este estilo'; }
  }

  /* ---------- Inicio ---------- */
  chips($('#types'), DASHBOARD_ORDER.map((k) => ({ id: k, name: DASHBOARDS[k].name })), state.type, pickType, false);
  chips($('#styles'), STYLES, state.style, pickStyle, true);
  renderTabs(); initBuild(); initExport(); renderCompare(); renderResources();
  $('#dash').innerHTML = DASHBOARDS[state.type].render();
  applyStyle(state.style);
  initHero();
  initCreate();
})();
