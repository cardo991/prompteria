/*
 * Tipos de dashboard. Cada tipo define su contenido, su disposición
 * (grid-template-areas en layout.css) y sus gráficos. No define colores:
 * todo color sale de las variables del estilo activo.
 * Los datos son de ejemplo.
 */
(function () {
  const Ch = window.Charts;

  function rng(seed) { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
  function walk(n, seed, start, vol, drift = 0) { const r = rng(seed); const out = [start]; for (let i = 1; i < n; i++) out.push(out[i - 1] * (1 + (r() - 0.5 + drift) * vol)); return out; }
  function ohlc(n, seed, start, vol) {
    const r = rng(seed); let p = start; const out = [];
    for (let i = 0; i < n; i++) { const o = p, c = o * (1 + (r() - 0.46) * vol), hi = Math.max(o, c) * (1 + r() * vol * 0.6), lo = Math.min(o, c) * (1 - r() * vol * 0.6); out.push([o, hi, lo, c]); p = c; }
    return out;
  }
  const P = (area, i, title, sub, body, cls = '') =>
    `<section class="panel ${cls}" style="grid-area:${area};--i:${i}">${title ? `<header class="ph"><h3>${title}</h3>${sub ? `<span class="ph-sub">${sub}</span>` : ''}</header>` : ''}${body}</section>`;
  const head = (title, sub, extra = '') =>
    `<div class="dhead"><div><h2 class="dtitle">${title}</h2><p class="dsub">${sub}</p></div><div class="dmeta">${extra}<span class="live"><i></i>En vivo</span></div></div>`;
  const legend = (items) => `<ul class="legend">${items.map((it, i) => `<li><i style="background:${it.color || Ch.C[i % 4]}"></i><span>${it.label}</span><b>${it.text ?? it.value}</b></li>`).join('')}</ul>`;
  const NFC = '<svg class="cc-nfc" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M8 10c3 4 3 10 0 14"/><path d="M15 6c5 6 5 16 0 22"/><path d="M22 2c7 8 7 22 0 30"/></svg>';
  const card = (c) => `<div class="ccard-wrap"><div class="ccard"><div class="cc-shine"></div><div class="cc-brand">${c.brand}</div><div class="cc-chip"></div>${NFC}<div class="cc-num">${c.num}</div><div class="cc-foot"><span>${c.name}</span><span>${c.exp}</span></div></div></div>`;
  const pills = (arr, on = 0) => `<div class="seg">${arr.map((a, i) => `<button type="button" class="pill${i === on ? ' on' : ''}">${a}</button>`).join('')}</div>`;

  const D = {};

  D.billetera = {
    name: 'Billetera',
    render() {
      const saldo = walk(30, 7, 400, 0.05, 0.08).map((v) => Math.round(v));
      const cats = [{ label: 'Súper', value: 38 }, { label: 'Delivery', value: 22 }, { label: 'Transporte', value: 18 }, { label: 'Otros', value: 22 }];
      const mov = [['S', 'Supermercado Día', 'Hoy, 12:40', '−18.420', 'neg'], ['N', 'Sueldo octubre', 'Ayer', '+1.240.000', 'pos'], ['D', 'Pedido de delivery', 'Ayer', '−9.300', 'neg'], ['T', 'Carga de transporte', 'Lun 19', '−5.000', 'neg']];
      return head('Hola, Vale', 'Tu plata en octubre', pills(['Mes', 'Año'])) +
        `<div class="grid l-billetera">` +
        P('bal', 0, '', '', `<p class="lbl">Saldo disponible</p><div class="num xl">$ 482.300</div><p class="delta pos">+8,2% contra septiembre</p><div class="actions"><button class="btn primary" type="button">Transferir</button><button class="btn" type="button">Pagar</button><button class="btn" type="button">Invertir</button></div>`, 'hero') +
        P('card', 1, 'Tu tarjeta', 'Débito automático activo', card({ brand: 'BILLETERA', num: '•••• 4417', name: 'VALENTINA SOSA', exp: '09/29' }) + `<div class="meter"><div class="row"><span>Límite disponible</span><b>68%</b></div><div class="bar"><i style="width:68%"></i></div></div>`) +
        P('trend', 2, 'Saldo', 'Últimos 30 días', Ch.lines([{ data: saldo }], { h: 220, labels: ['1 oct', '8', '15', '22', '29'], label: 'Saldo de los últimos 30 días' })) +
        P('cat', 3, 'Gastos por categoría', 'Octubre', `<div class="donut-wrap">${Ch.donut(cats, { center: '718k', sub: 'gastados', label: 'Gastos por categoría' })}</div>` + legend(cats.map((c) => ({ ...c, text: c.value + '%' })))) +
        P('mov', 4, 'Movimientos', 'Recientes', `<ul class="list">${mov.map((m) => `<li><span class="av">${m[0]}</span><div><b>${m[1]}</b><small>${m[2]}</small></div><span class="amt ${m[4]}">${m[3]}</span></li>`).join('')}</ul>`) +
        `</div>`;
    }
  };

  D.cripto = {
    name: 'Cripto',
    render() {
      const coins = [['BTC', '67.420', '+3,8%', 'pos', 11], ['ETH', '3.512', '+6,1%', 'pos', 22], ['SOL', '182,4', '+9,4%', 'pos', 33], ['ADA', '0,61', '−1,2%', 'neg', 44]];
      const alloc = [{ label: 'BTC', value: 54 }, { label: 'ETH', value: 26 }, { label: 'SOL', value: 14 }, { label: 'Otras', value: 6 }];
      return head('Portafolio', 'Mercado en las últimas 24 h', `<span class="tag">US$ 41.820</span>`) +
        `<div class="grid l-cripto">` +
        coins.map((c, i) => P('s' + (i + 1), i, '', '', `<div class="coin"><div><b>${c[0]}</b><small>US$</small></div><span class="delta ${c[3]}">${c[2]}</span></div><div class="num md">${c[1]}</div>${Ch.spark(walk(24, c[4], 100, 0.06, c[3] === 'pos' ? 0.12 : -0.12), { color: c[3] === 'pos' ? 'var(--pos)' : 'var(--neg)', w: 220, h: 48, label: 'Tendencia de ' + c[0] })}`, 'tile')).join('') +
        P('chart', 4, 'BTC / USD', 'Velas de 1 hora', `<div class="chart-top"><div class="num lg">67.420</div>${pills(['1H', '1D', '1S', '1M'])}</div>` + Ch.candles(ohlc(36, 5, 64000, 0.012), { h: 380, label: 'Velas BTC/USD' }), 'hero') +
        P('alloc', 5, 'Distribución', 'Por activo', `<div class="donut-wrap sm">${Ch.donut(alloc, { center: '4', sub: 'activos', label: 'Distribución del portafolio' })}</div>` + legend(alloc.map((a) => ({ ...a, text: a.value + '%' })))) +
        P('wallet', 6, 'Tarjeta cripto', 'Paga con tu saldo', card({ brand: 'CRYPTO', num: '0x7F •••• A93C', name: 'VALENTINA SOSA', exp: '11/30' }) + `<div class="meter"><div class="row"><span>Staking</span><b>4,1% anual</b></div><div class="bar"><i style="width:41%"></i></div></div>`) +
        `</div>`;
    }
  };

  D.tienda = {
    name: 'Tienda',
    render() {
      const kp = [['Ventas', '$ 2,4M', '+12%', 'pos', 1], ['Pedidos', '186', '+22', 'pos', 2], ['Ticket medio', '$ 12,9k', '−3%', 'neg', 3], ['Conversión', '3,8%', '+0,4', 'pos', 4]];
      const hours = [12, 18, 26, 34, 52, 61, 48, 40, 58, 72, 66, 44];
      const top = [['Zapatillas Nube', 38, '$ 1,1M', 'ok'], ['Campera Brisa', 27, '$ 864k', 'ok'], ['Mochila Urbana', 19, '$ 342k', 'low'], ['Remera básica', 15, '$ 120k', 'low']];
      return head('Tu tienda hoy', 'Ventas y pedidos en tiempo real', pills(['Hoy', '7 días', '30 días'])) +
        `<div class="grid l-tienda">` +
        kp.map((k, i) => P('k' + (i + 1), i, '', '', `<p class="lbl">${k[0]}</p><div class="num lg">${k[1]}</div><div class="kfoot"><span class="delta ${k[3]}">${k[2]}</span>${Ch.spark(walk(16, k[4] * 9, 50, 0.1, k[3] === 'pos' ? 0.1 : -0.1), { w: 110, h: 34, label: 'Tendencia' })}</div>`, i === 0 ? 'hero tile' : 'tile')).join('') +
        P('sales', 4, 'Ventas por hora', 'Pico a las 17 h', Ch.bars(hours, { h: 240, hi: 9, labels: ['8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'], label: 'Ventas por hora' })) +
        P('funnel', 5, 'Embudo de compra', 'Hoy', Ch.funnel([{ label: 'Visitas', value: 4890 }, { label: 'Producto', value: 2210 }, { label: 'Carrito', value: 640 }, { label: 'Compra', value: 186 }], { label: 'Embudo de compra' })) +
        P('top', 6, 'Productos más vendidos', '', `<div class="tbl-wrap"><table><thead><tr><th>Producto</th><th class="r">Unidades</th><th class="r">Ingresos</th><th>Stock</th></tr></thead><tbody>${top.map((t) => `<tr><td>${t[0]}</td><td class="r">${t[1]}</td><td class="r">${t[2]}</td><td><span class="badge ${t[3]}">${t[3] === 'ok' ? 'Normal' : 'Bajo'}</span></td></tr>`).join('')}</tbody></table></div>`) +
        `</div>`;
    }
  };

  D.running = {
    name: 'Running',
    render() {
      const r = rng(9); const heatRows = [0, 1, 2, 3].map(() => Array.from({ length: 14 }, () => (r() < 0.3 ? 0 : Math.round(r() * 14))));
      const pace = [5.42, 5.31, 5.36, 5.18, 5.22, 5.12, 5.05, 5.12, 4.98, 5.02];
      return head('Entrenamiento', 'Semana 42', pills(['Semana', 'Mes'])) +
        `<div class="grid l-running">` +
        P('rings', 0, 'Objetivos de hoy', '', `<div class="rings-wrap">${Ch.rings([84, 66, 92], { label: 'Objetivos del día' })}</div>` + legend([{ label: 'Distancia', text: '12,4 km' }, { label: 'Tiempo', text: '1 h 04' }, { label: 'Calorías', text: '780' }]), 'hero') +
        P('week', 1, 'Km por día', '42 km esta semana', Ch.bars([8, 0, 10.5, 6, 0, 12.4, 5], { w: 380, h: 170, hiMax: true, gap: 0.5, labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'], label: 'Kilómetros por día' })) +
        P('pace', 2, 'Ritmo por km', 'Últimas 10 salidas', `<div class="num md">5:02<small> /km</small></div>` + Ch.lines([{ data: pace.map((p) => -p) }], { w: 380, h: 120, area: false, label: 'Ritmo de las últimas salidas' })) +
        P('rec', 3, 'Mejores marcas', '', `<ul class="records">${[['5K', '24:10', 'Septiembre'], ['10K', '51:30', 'Agosto'], ['21K', '1:58:02', 'Julio'], ['Fondo', '28 km', 'Junio']].map((x) => `<li><span>${x[0]}</span><b class="num sm">${x[1]}</b><small>${x[2]}</small></li>`).join('')}</ul>`) +
        P('heat', 4, 'Constancia', 'Últimas 14 semanas', `<div class="heat-wrap">${Ch.heat(heatRows, { cell: 22, round: true, label: 'Días entrenados' })}</div>`) +
        `</div>`;
    }
  };

  D.analitica = {
    name: 'Analítica',
    render() {
      const a = walk(30, 3, 1200, 0.08, 0.04), b = a.map((v, i) => v * 0.42 + i * 4), c = a.map((v, i) => v * 0.18 + i * 2);
      const coh = [[100, 64, 51, 44, 40, 37], [100, 61, 49, 42, 39, 0], [100, 67, 55, 47, 0, 0], [100, 70, 58, 0, 0, 0], [100, 66, 0, 0, 0, 0]];
      const pages = [['/precios', 9820], ['/', 7410], ['/blog/novedades', 4380], ['/registro', 3120]];
      const src = [{ label: 'Orgánico', value: 46 }, { label: 'Directo', value: 24 }, { label: 'Redes', value: 18 }, { label: 'Referidos', value: 12 }];
      const mx = pages[0][1];
      return head('Producto', 'Uso de los últimos 30 días', pills(['30 días', '90 días', 'Año'])) +
        `<div class="grid l-analitica">` +
        P('kpi', 0, '', '', `<div class="kstrip">${[['Usuarios activos', '18.402', '+6,4%', 'pos'], ['Registros', '1.284', '+11%', 'pos'], ['Retención 30 d', '41%', '+2 pts', 'pos'], ['Bajas', '2,1%', '+0,3', 'neg']].map((k) => `<div><p class="lbl">${k[0]}</p><div class="num lg">${k[1]}</div><span class="delta ${k[3]}">${k[2]}</span></div>`).join('')}</div>`, 'hero') +
        P('lines', 1, 'Tráfico', 'Visitas, registros y activos', legend([{ label: 'Visitas', text: '' }, { label: 'Registros', text: '' }, { label: 'Activos', text: '' }]).replace('legend', 'legend inline') + Ch.lines([{ data: a }, { data: b }, { data: c }], { h: 240, independent: true, labels: ['22 sep', '29', '6 oct', '13', '20'], label: 'Tráfico de los últimos 30 días' })) +
        P('cohort', 2, 'Retención por cohorte', 'Semanas desde el registro', `<div class="heat-wrap">${Ch.heat(coh, { cell: 44, values: true, label: 'Retención por cohorte' })}</div>`) +
        P('pages', 3, 'Páginas más vistas', '', `<ul class="hbars">${pages.map((p) => `<li><span>${p[0]}</span><b>${p[1].toLocaleString('es-AR')}</b><i style="width:${Math.round(p[1] / mx * 100)}%"></i></li>`).join('')}</ul>`) +
        P('src', 4, 'Fuentes', '', `<div class="donut-wrap sm">${Ch.donut(src, { center: '62k', sub: 'visitas', label: 'Fuentes de tráfico' })}</div>` + legend(src.map((s) => ({ ...s, text: s.value + '%' })))) +
        `</div>`;
    }
  };

  D.clima = {
    name: 'Clima',
    render() {
      const temps = [14, 13, 13, 15, 18, 21, 23, 24, 23, 21, 18, 16];
      const week = [['Hoy', 13, 24], ['Jue', 15, 26], ['Vie', 17, 27], ['Sáb', 14, 21], ['Dom', 11, 18], ['Lun', 12, 20]];
      return head('Córdoba', 'Pronóstico extendido', pills(['°C', '°F'])) +
        `<div class="grid l-clima">` +
        P('now', 0, '', '', `<div class="sun" aria-hidden="true"></div><p class="lbl">Ahora</p><div class="num xxl">23°</div><p class="cond">Soleado con nubes altas</p><div class="minmax"><span>Mín 13°</span><span>Máx 24°</span><span>Sensación 24°</span></div>`, 'hero') +
        P('hour', 1, 'Próximas horas', 'Temperatura', Ch.lines([{ data: temps }], { h: 210, labels: ['6', '9', '12', '15', '18', '21'], label: 'Temperatura por hora' })) +
        P('week', 2, 'Esta semana', '', `<ul class="days">${week.map((d) => `<li><span>${d[0]}</span><small>${d[1]}°</small><div class="range"><i style="left:${(d[1] - 10) / 18 * 100}%;right:${100 - (d[2] - 10) / 18 * 100}%"></i></div><b>${d[2]}°</b></li>`).join('')}</ul>`) +
        P('stats', 3, 'Condiciones', '', `<div class="gstat"><div class="g">${Ch.gauge(62, { label: 'Humedad' })}<div class="gv"><b class="num md">62%</b><small>humedad</small></div></div><div class="minis"><div><p class="lbl">Viento</p><b class="num sm">14 km/h</b></div><div><p class="lbl">Índice UV</p><b class="num sm">7</b></div><div><p class="lbl">Lluvia</p><b class="num sm">10%</b></div></div></div>`) +
        `</div>`;
    }
  };

  window.DASHBOARDS = D;
  window.DASHBOARD_ORDER = ['billetera', 'cripto', 'tienda', 'running', 'analitica', 'clima'];
})();
