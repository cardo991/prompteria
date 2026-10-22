# Estilo visual del proyecto: Aurora oliva

Cuando toques estilos o componentes visuales, seguí este estilo. No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

## Tokens

```css
/* Promptería · Aurora oliva */
:root {
  --bg: #121211;
  --bg-img: radial-gradient(circle at 100% 0, #2A2A1A 0, transparent 40%);
  --surface: #1C1C1A;
  --surface-2: #242421;
  --border: #2A2A26;
  --ink: #F1F1EA;
  --muted: #9C9C92;
  --accent: #D7F04B;
  --accent-ink: #1B1C0C;
  --pos: #C3E44A;
  --warn: #F2B45A;
  --neg: #E58A7A;
  --c1: #D7F04B;
  --c2: #D8C47A;
  --c3: #C98A80;
  --c4: #6E8420;
  --hero: radial-gradient(circle at 90% 10%, #6E8420 0, transparent 55%), radial-gradient(circle at 55% 115%, #8E5B4E 0, transparent 55%), #2A2A1D;
  --hero-ink: #F1F1EA;
  --hero-muted: #C9C9BC;
  --card-bg: radial-gradient(circle at 90% 0, #8EA62C 0, transparent 60%), radial-gradient(circle at 10% 110%, #A2675A 0, transparent 60%), #2A2A1D;
  --grid: rgba(255,255,255,.07);
  --track: rgba(255,255,255,.1);
  --font: "Inter", system-ui, sans-serif;
  --font-num: "Inter", system-ui, sans-serif;
  --num-w: 300;
  --num-ls: -0.02em;
  --num-scale: 1;
  --num-style: normal;
  --radius: 24px;
  --shadow: none;
  --blur: 0px;
}
```

## Especificación

Aurora oliva. Oscuro cálido y premium, con una aurora de luz difusa en el panel principal.

Paleta
- Fondo #121211, superficies #1C1C1A, superficie elevada #242421, bordes #2A2A26.
- Texto #F1F1EA, texto secundario #9C9C92.
- Acento #D7F04B (texto encima #1B1C0C).
- Estados: positivo #C3E44A, alerta #F2B45A, negativo #E58A7A.
- Series de gráficos, en este orden: #D7F04B, #D8C47A, #C98A80, #6E8420.

Tipografía: Inter. Números grandes en peso 300 (finos) con tracking -0.02em; títulos de panel en 600; textos secundarios en 400.
Formas: Radio 24px en paneles, 32px en el panel protagonista, píldoras totalmente redondeadas. Bordes de 1px sutiles, sin sombras.
Superficies: El panel protagonista lleva la aurora: dos radial-gradient difusos (oliva arriba a la derecha, rosa viejo abajo) sobre #2A2A1D. El resto, superficies planas.
Componentes: Botón primario relleno con el acento y texto oscuro; secundarios con fondo de superficie y borde. Chips y filtros como píldoras; el activo, relleno con el acento.
Gráficos: Líneas de 2,5px con curvas suaves y un relleno degradé del acento hacia transparente. Barras con puntas redondeadas al 35% de opacidad y la destacada al 100%. Grilla casi invisible.
Detalles: Un punto "en vivo" que late lento. Números con cifras tabulares.
Evitá: Sombras grises, más de un acento fuerte, blanco puro.

## Reglas

- Ningún color hex suelto en componentes: siempre variables.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
