---
name: estilo-minimal
description: Aplica el estilo visual "Minimal pro" de Promptería (herramienta profesional minimalista densa, precisa, sin adornos) a interfaces y dashboards. Usar cuando pidan el estilo Minimal pro, este look, estos colores o "estilo minimal".
---

# Estilo Minimal pro

No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

## Tokens

Definí estas variables en el CSS global (o mapealas al sistema de tokens del proyecto) y usalas en todos los componentes:

```css
/* Promptería · Minimal pro */
:root {
  --bg: #0C0D0F;
  --bg-img: none;
  --surface: #131417;
  --surface-2: #1A1B1F;
  --border: #222429;
  --ink: #E7E8EB;
  --muted: #7C808A;
  --accent: #8B7CFF;
  --accent-ink: #FFFFFF;
  --pos: #4CC38A;
  --warn: #E5A84B;
  --neg: #EB6F70;
  --c1: #8B7CFF;
  --c2: #4CC38A;
  --c3: #E5A84B;
  --c4: #5AB0F0;
  --hero: linear-gradient(#131417, #131417) padding-box, linear-gradient(120deg, #8B7CFF, #222429 45%) border-box;
  --hero-ink: #E7E8EB;
  --hero-muted: #7C808A;
  --card-bg: linear-gradient(140deg, #2E2A55, #131417 65%);
  --grid: rgba(255,255,255,.05);
  --track: #1F2126;
  --font: "Inter", system-ui, sans-serif;
  --font-num: "Inter", system-ui, sans-serif;
  --num-w: 500;
  --num-ls: -0.035em;
  --num-scale: 0.92;
  --num-style: normal;
  --radius: 12px;
  --shadow: none;
  --blur: 0px;
}
```

## Especificación

Minimal pro. Herramienta profesional minimalista: densa, precisa, sin adornos.

Paleta
- Fondo #0C0D0F, superficies #131417, superficie elevada #1A1B1F, bordes #222429.
- Texto #E7E8EB, texto secundario #7C808A.
- Acento #8B7CFF (texto encima #FFFFFF).
- Estados: positivo #4CC38A, alerta #E5A84B, negativo #EB6F70.
- Series de gráficos, en este orden: #8B7CFF, #4CC38A, #E5A84B, #5AB0F0.

Tipografía: Inter. Números en peso 500 con tracking -0.035em, un poco más chicos; labels de 13px.
Formas: Radio 12px, bordes finos #222429, separación de 10px entre paneles.
Superficies: Superficies planas. El panel protagonista se distingue solo por un borde degradé violeta → gris.
Componentes: Botones compactos (32px de alto); primario violeta, secundarios con borde. Píldoras pequeñas con borde.
Gráficos: Líneas de 1,5px sin relleno, con punto solo en el último valor. Barras finas. Grilla apenas visible.
Detalles: Alineación estricta y alta densidad de información.
Evitá: Degradés de fondo, radios grandes, números gigantes.

## Cómo aplicarlo

1. Encontrá dónde se definen colores, tipografías y radios (CSS global, tema, tailwind.config).
2. Reemplazá los valores por los tokens de arriba.
3. Buscá colores sueltos en componentes y pasalos a variables.
4. Ajustá gráficos para que usen --c1 a --c4 en orden.

## Antes de terminar

- [ ] El texto tiene contraste AA (4,5:1) contra su fondo, incluido el texto secundario.
- [ ] Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- [ ] El acento se usa para una sola cosa: acción principal o dato destacado.
- [ ] Los números usan cifras tabulares y no "bailan" al actualizarse.
- [ ] Todo lo clickeable tiene foco de teclado visible.
- [ ] Positivo, alerta y negativo usan siempre los mismos colores en todo el producto.
- [ ] Los gráficos usan las series del estilo en orden y la grilla es tenue.
- [ ] Se ve bien a 375 px de ancho: nada se corta ni hace scroll horizontal en el body.
- [ ] Las animaciones respetan prefers-reduced-motion.
- [ ] La IA no cambió textos, datos, layout ni lógica: solo el look.
