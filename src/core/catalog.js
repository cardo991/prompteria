/*
 * Catálogo de Promptería: tipos de dashboard, stacks, herramientas,
 * recetas de gráficos, checklist de calidad y recursos.
 * Compartido entre la web, los scripts y el MCP server.
 */
(function (g) {
  g.CATALOG = {
    types: {
      billetera: {
        name: 'Billetera',
        purpose: 'una billetera digital personal',
        content: 'saldo disponible con variación contra el mes anterior y acciones (Transferir, Pagar, Invertir); tarjeta de crédito con el límite disponible; evolución del saldo de los últimos 30 días; gastos por categoría; últimos movimientos con monto positivo o negativo',
        layout: 'grilla de 3 columnas. Fila 1: saldo protagonista (2 columnas) y tarjeta. Fila 2: evolución del saldo (2 columnas) y gastos por categoría, que baja ocupando 2 filas. Fila 3: movimientos (2 columnas)',
        charts: 'área con línea suave para el saldo, dona con leyenda para categorías, tarjeta de crédito en 3D que flota levemente'
      },
      cripto: {
        name: 'Cripto',
        purpose: 'un portafolio de criptomonedas',
        content: 'cuatro monedas con precio, variación de 24 h y sparkline; gráfico de velas de BTC/USD con selector de intervalo (1H, 1D, 1S, 1M); distribución del portafolio por activo; tarjeta cripto con rendimiento de staking',
        layout: 'grilla de 4 columnas. Fila 1: las cuatro monedas. Filas 2 y 3: velas protagonistas (3 columnas), con distribución y tarjeta apiladas a la derecha',
        charts: 'velas con colores de positivo y negativo y línea de precio actual punteada, sparklines, dona'
      },
      tienda: {
        name: 'Tienda',
        purpose: 'el panel de una tienda online',
        content: 'ventas, pedidos, ticket medio y conversión con variación y tendencia; ventas por hora con el pico destacado; embudo de compra (visitas, producto, carrito, compra) con porcentaje entre pasos; productos más vendidos con estado de stock',
        layout: 'grilla de 4 columnas. Fila 1: cuatro KPIs (el de ventas como protagonista). Fila 2: ventas por hora (3 columnas) y embudo, que baja ocupando 2 filas. Fila 3: tabla de productos (3 columnas)',
        charts: 'barras verticales con una destacada, embudo horizontal centrado, sparklines en los KPIs'
      },
      running: {
        name: 'Running',
        purpose: 'una app de entrenamiento para corredores',
        content: 'objetivos del día (distancia, tiempo, calorías); kilómetros por día de la semana; ritmo por km de las últimas salidas; mejores marcas (5K, 10K, 21K, fondo); constancia de las últimas 14 semanas',
        layout: 'grilla de 3 columnas. Objetivos protagonistas a la izquierda ocupando 2 filas, km por día y ritmo apilados en el centro, mejores marcas a la derecha, y la constancia a lo ancho abajo',
        charts: 'anillos de actividad concéntricos, barras por día, línea de ritmo, mapa de calor de días entrenados'
      },
      analitica: {
        name: 'Analítica',
        purpose: 'la analítica de uso de un producto digital',
        content: 'usuarios activos, registros, retención a 30 días y bajas; tráfico con visitas, registros y activos; retención por cohorte semanal; páginas más vistas; fuentes de tráfico',
        layout: 'grilla de 3 columnas. Fila 1: tira de KPIs protagonista a lo ancho. Fila 2: tráfico (2 columnas) y cohortes, que baja ocupando 2 filas. Fila 3: páginas y fuentes',
        charts: 'líneas múltiples con escalas independientes, matriz de cohortes con porcentajes, barras horizontales, dona'
      },
      clima: {
        name: 'Clima',
        purpose: 'una app de pronóstico del tiempo',
        content: 'temperatura actual con condición, mínima, máxima y sensación; temperatura de las próximas horas; rango de temperaturas de la semana; humedad, viento, índice UV y probabilidad de lluvia',
        layout: 'grilla de 3 columnas. Temperatura actual protagonista a la izquierda ocupando 2 filas, próximas horas arriba a la derecha (2 columnas), semana y condiciones abajo',
        charts: 'curva de temperatura por hora, barras de rango por día, gauge de arco para la humedad'
      }
    },

    stacks: {
      react: { name: 'React + Tailwind', spec: 'React con Vite y Tailwind CSS. Componentes funcionales y tipados con TypeScript. Gráficos con Recharts. Los colores del estilo van como variables CSS en :root y se mapean en tailwind.config para usarlos como clases.' },
      angular: { name: 'Angular', spec: 'Angular 17 o superior con standalone components y SCSS. Los colores del estilo van como variables CSS globales en styles.scss. Gráficos con ECharts (ngx-echarts).' },
      html: { name: 'HTML + CSS', spec: 'HTML, CSS y JavaScript sin frameworks ni build, en un solo archivo. Gráficos en SVG generado con JavaScript. Los colores del estilo van como variables CSS en :root.' },
      powerbi: { name: 'Power BI', spec: 'Power BI Desktop, lienzo de 1280 × 720. Usá el tema JSON del estilo (Vista → Temas → Buscar temas). Devolvé la ubicación y el tamaño de cada visual en píxeles, el tipo de visual nativo que corresponde a cada gráfico y las medidas DAX necesarias con nombres claros.' }
    },

    tools: {
      claude: { name: 'Claude', tip: 'Claude sigue muy bien instrucciones separadas en etiquetas XML: tarea, restricciones, estilo y entrega quedan claramente delimitados.' },
      codex: { name: 'Codex', tip: 'Codex trabaja como agente sobre el repo: conviene acotar qué archivos puede tocar y dejar criterios de aceptación verificables.' },
      grok: { name: 'Grok', tip: 'Grok rinde mejor con pedidos directos, reglas numeradas y el formato de salida explícito.' },
      cursor: { name: 'Cursor', tip: 'En Cursor lo ideal es guardar el estilo como regla del proyecto (.cursor/rules) y nombrarla en el chat con @.' },
      v0: { name: 'v0 / Lovable', tip: 'Los generadores visuales entienden mejor una estética descrita en palabras más el mapeo directo a los tokens de Tailwind y shadcn/ui.' }
    },

    charts: [
      { id: 'area', name: 'Área', when: 'Evolución de un valor en el tiempo cuando importa la tendencia más que cada punto.', prompt: 'Gráfico de área con línea suave (curva monótona) de 2,5px en var(--c1) y relleno degradé de var(--c1) al 35% hacia transparente. Grilla horizontal de 3 líneas en var(--grid), etiquetas del eje X en var(--muted) a 12px, sin eje Y visible. Un punto en el último valor con borde del color de la superficie.' },
      { id: 'barras', name: 'Barras', when: 'Comparar cantidades entre categorías o franjas horarias y marcar un máximo.', prompt: 'Gráfico de barras verticales en var(--c1) al 35% de opacidad, con la barra destacada (máximo o actual) al 100%. Puntas superiores redondeadas a 6px, separación del 38% del ancho. Etiquetas debajo en var(--muted). Las barras crecen desde la base al entrar, de a una.' },
      { id: 'dona', name: 'Dona', when: 'Mostrar partes de un total con cuatro categorías o menos.', prompt: 'Dona de grosor 22px sobre un anillo base var(--track), segmentos en var(--c1), var(--c2), var(--c3) y var(--c4) con un hueco mínimo entre ellos. Valor total al centro en la tipografía de números y una etiqueta corta debajo. Leyenda en lista con cuadraditos de color y porcentaje alineado a la derecha.' },
      { id: 'velas', name: 'Velas', when: 'Precios con apertura, máximo, mínimo y cierre por intervalo.', prompt: 'Gráfico de velas: cuerpo relleno en var(--pos) si cerró arriba y var(--neg) si cerró abajo, mecha de 1,5px del mismo color. Línea horizontal punteada en var(--muted) en el precio actual. Grilla de 4 líneas en var(--grid).' },
      { id: 'anillos', name: 'Anillos', when: 'Progreso de hasta tres objetivos a la vez.', prompt: 'Tres anillos concéntricos de 20px de grosor, cada uno sobre su pista var(--track), en var(--c1), var(--c2) y var(--c3), con extremos redondeados y empezando arriba. Leyenda al pie con el valor de cada objetivo.' },
      { id: 'embudo', name: 'Embudo', when: 'Pasos de un proceso donde se pierde gente en cada etapa.', prompt: 'Embudo horizontal centrado: una barra por paso en var(--c1) con opacidad decreciente, ancho proporcional a la raíz del valor para que los pasos chicos sigan legibles. Arriba de cada barra, el nombre del paso a la izquierda y el valor con el porcentaje respecto del paso anterior a la derecha.' },
      { id: 'calor', name: 'Mapa de calor', when: 'Constancia en el tiempo o matrices como cohortes de retención.', prompt: 'Grilla de celdas cuadradas con radio de 6px y 5px de separación. Celdas vacías en var(--track); celdas con valor en var(--c1) con opacidad proporcional al valor (mínimo 18%). En cohortes, el porcentaje centrado en cada celda a 12px.' },
      { id: 'gauge', name: 'Gauge', when: 'Un solo porcentaje contra un máximo, como humedad o meta cumplida.', prompt: 'Gauge de arco de 252° abierto abajo, trazo de 9px con extremos redondeados sobre una pista var(--track). El arco de valor lleva un degradé de var(--c3) a var(--c2) a var(--c1) y termina en una perilla circular. Valor grande al centro y etiqueta debajo.' },
      {"id": "ranking", "name": "Barras horizontales", "when": "Comparar categorías con nombres largos y ordenar un ranking.", "prompt": "Barras horizontales ordenadas de mayor a menor, con eje cuantitativo desde cero. Nombres a la izquierda y valores al final de cada barra. Usá var(--c1), resaltá la categoría seleccionada con var(--c2) y conservá etiquetas legibles en móvil."},
      {"id": "apiladas", "name": "Barras apiladas al 100%", "when": "Comparar la composición porcentual de varios grupos.", "prompt": "Barras horizontales apiladas al 100%, una por grupo, con segmentos en var(--c1) a var(--c4). Mantené el mismo orden de categorías en todas las barras. Mostrá porcentajes dentro solo si caben, leyenda común y tooltip con valor absoluto y porcentaje. Todas las barras deben sumar 100%."},
      {"id": "dispersion", "name": "Dispersión", "when": "Explorar relaciones entre dos variables y detectar valores atípicos.", "prompt": "Gráfico de dispersión con ejes X e Y titulados y unidades explícitas. Puntos en var(--c1) al 70%, sin líneas que los conecten; grilla sutil en var(--grid). Tooltip con nombre y ambos valores. Diferenciá grupos también con formas y no presentes correlación como causalidad."},
      {"id": "cascada", "name": "Cascada", "when": "Explicar cómo ingresos y egresos llevan de un valor inicial al saldo final.", "prompt": "Gráfico de cascada con total inicial y final anclados a cero en var(--c1), aumentos en var(--pos) y disminuciones en var(--neg). Cada variación parte del acumulado anterior, con conectores finos. Etiquetá importes con signo, categorías y unidad; verificá que el saldo final sea igual al inicial más todas las variaciones."},
      {"id": "pareto", "name": "Pareto", "when": "Identificar las categorías que concentran la mayor parte de un problema.", "prompt": "Gráfico de Pareto: barras en var(--c1) ordenadas de mayor a menor y línea de porcentaje acumulado en var(--c2). Eje izquierdo con cantidades desde cero, derecho de 0 a 100%, línea de referencia al 80% y leyenda explícita. El acumulado termina en 100%; no mezcles unidades sin identificar ambos ejes."},
      {"id": "bala", "name": "Resultado contra meta", "when": "Comparar el desempeño de varios indicadores con su objetivo sin ocupar mucho espacio.", "prompt": "Gráfico de bala horizontal por indicador: bandas de desempeño en var(--track) con distinta intensidad, barra del valor real en var(--c1) y marcador vertical de la meta en var(--ink). Mostrá valor, meta, unidades y escala desde cero para cada fila. Definí si un valor mayor o menor es favorable; no compares longitudes entre escalas distintas."}
    ],

    checklist: [
      { id: 'contraste', text: 'El texto tiene contraste AA (4,5:1) contra su fondo, incluido el texto secundario.' },
      { id: 'tokens', text: 'Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.' },
      { id: 'acento', text: 'El acento se usa para una sola cosa: acción principal o dato destacado.' },
      { id: 'cifras', text: 'Los números usan cifras tabulares y no "bailan" al actualizarse.' },
      { id: 'foco', text: 'Todo lo clickeable tiene foco de teclado visible.' },
      { id: 'estados', text: 'Positivo, alerta y negativo usan siempre los mismos colores en todo el producto.' },
      { id: 'graficos', text: 'Los gráficos usan las series del estilo en orden y la grilla es tenue.' },
      { id: 'mobile', text: 'Se ve bien a 375 px de ancho: nada se corta ni hace scroll horizontal en el body.' },
      { id: 'movimiento', text: 'Las animaciones respetan prefers-reduced-motion.' },
      { id: 'estructura', text: 'La IA no cambió textos, datos, layout ni lógica: solo el look.' }
    ],

    resources: [
      { group: 'MCP', items: [
        { name: 'Model Context Protocol', url: 'https://modelcontextprotocol.io', why: 'La especificación y las guías oficiales para crear servers y clientes.' },
        { name: 'Servers de referencia', url: 'https://github.com/modelcontextprotocol/servers', why: 'Ejemplos oficiales y un listado grande de servers de la comunidad.' },
        { name: 'SDK de TypeScript', url: 'https://github.com/modelcontextprotocol/typescript-sdk', why: 'El SDK que usa el MCP server de este repo.' },
        { name: 'MCP Inspector', url: 'https://github.com/modelcontextprotocol/inspector', why: 'Para probar un server a mano antes de conectarlo a un agente.' }
      ] },
      { group: 'Claude', items: [
        { name: 'Guía de prompting', url: 'https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview', why: 'Cómo estructurar prompts: claridad, ejemplos, etiquetas XML.' },
        { name: 'Skills de Claude Code', url: 'https://code.claude.com/docs/en/skills', why: 'Formato de SKILL.md y dónde guardarlos; los de este repo siguen ese formato.' }
      ] },
      { group: 'Codex', items: [
        { name: 'Documentación de Codex', url: 'https://developers.openai.com/codex', why: 'CLI, IDE y app de Codex, con su configuración.' },
        { name: 'AGENTS.md en Codex', url: 'https://developers.openai.com/codex/guides/agents-md', why: 'Cómo Codex lee las instrucciones del repo y en qué orden.' }
      ] },
      { group: 'Cursor', items: [
        { name: 'Reglas de Cursor', url: 'https://cursor.com/docs/rules', why: 'Formato .mdc con description, globs y alwaysApply.' }
      ] },
      { group: 'Grok', items: [
        { name: 'Documentación de xAI', url: 'https://docs.x.ai', why: 'API y modelos de Grok.' }
      ] },
      { group: 'Power BI', items: [
        { name: 'Temas de informe', url: 'https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes', why: 'Estructura del JSON de tema y cómo importarlo.' }
      ] },
      { group: 'Accesibilidad', items: [
        { name: 'Contraste mínimo (WCAG 2.2)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', why: 'Qué pide el nivel AA y por qué.' },
        { name: 'Verificador de contraste', url: 'https://webaim.org/resources/contrastchecker/', why: 'Para chequear rápido dos colores.' }
      ] }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
