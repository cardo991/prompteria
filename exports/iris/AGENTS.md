# Estilo visual del proyecto: Medianoche iridiscente

Cuando toques estilos o componentes visuales, seguí este estilo. No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

## Tokens

```css
/* Promptería · Medianoche iridiscente */
:root {
  --bg: #06070E;
  --bg-img: radial-gradient(circle at 10% 0, #1D1A5C 0, transparent 45%), radial-gradient(circle at 100% 70%, #063A44 0, transparent 45%);
  --surface: rgba(255,255,255,.045);
  --surface-2: rgba(255,255,255,.08);
  --border: rgba(255,255,255,.09);
  --ink: #EEF0FF;
  --muted: #8F94B8;
  --accent: #9DBBFF;
  --accent-ink: #0A0F25;
  --pos: #5EE7C8;
  --warn: #FFC978;
  --neg: #FF8BA7;
  --c1: #9DBBFF;
  --c2: #5EE7DF;
  --c3: #E39BFF;
  --c4: #FFC978;
  --hero: radial-gradient(circle at 0 0, #4A33D6 0, transparent 55%), radial-gradient(circle at 100% 20%, #0FA3B1 0, transparent 50%), radial-gradient(circle at 70% 115%, #C2398F 0, transparent 55%), #141433;
  --hero-ink: #EEF0FF;
  --hero-muted: #C9CCF0;
  --card-bg: linear-gradient(135deg, #4A33D6 0, #0FA3B1 48%, #C2398F 100%);
  --grid: rgba(255,255,255,.06);
  --track: rgba(255,255,255,.1);
  --font: "Manrope", system-ui, sans-serif;
  --font-num: "Manrope", system-ui, sans-serif;
  --num-w: 300;
  --num-ls: -0.025em;
  --num-scale: 1;
  --num-style: normal;
  --radius: 22px;
  --shadow: none;
  --blur: 18px;
}
```

## Especificación

Medianoche iridiscente. Noche iridiscente: paneles de vidrio oscuro sobre luces violeta, turquesa y magenta.

Paleta
- Fondo #06070E, superficies rgba(255,255,255,.045), superficie elevada rgba(255,255,255,.08), bordes rgba(255,255,255,.09).
- Texto #EEF0FF, texto secundario #8F94B8.
- Acento #9DBBFF (texto encima #0A0F25).
- Estados: positivo #5EE7C8, alerta #FFC978, negativo #FF8BA7.
- Series de gráficos, en este orden: #9DBBFF, #5EE7DF, #E39BFF, #FFC978.

Tipografía: Manrope. Números en peso 300, títulos en 600.
Formas: Radio 22px, bordes blancos al 9%, sin sombras.
Superficies: Paneles translúcidos (blanco al 4,5%) con backdrop-filter blur(18px) saturate(1.4). Panel protagonista con un mesh gradient de tres radial-gradient (violeta #4A33D6, turquesa #0FA3B1, magenta #C2398F) sobre #141433.
Componentes: Botón primario azul hielo con texto casi negro; secundarios de vidrio. Píldoras de vidrio con borde fino.
Gráficos: Líneas con relleno degradé muy transparente; barras al 45% con la destacada sólida; series en el orden de la paleta.
Detalles: El fondo general tiene dos resplandores muy tenues (índigo y petróleo) que no compiten con el contenido.
Evitá: Negro plano sin profundidad, colores saturados en el texto.

## Reglas

- Ningún color hex suelto en componentes: siempre variables.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
