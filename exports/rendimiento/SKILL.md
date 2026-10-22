---
name: estilo-rendimiento
description: Aplica el estilo visual "Rendimiento" de Promptería (energía de app deportiva negro puro, verde eléctrico y números condensados) a interfaces y dashboards. Usar cuando pidan el estilo Rendimiento, este look, estos colores o "estilo rendimiento".
---

# Estilo Rendimiento

No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

## Tokens

Definí estas variables en el CSS global (o mapealas al sistema de tokens del proyecto) y usalas en todos los componentes:

```css
/* Promptería · Rendimiento */
:root {
  --bg: #000000;
  --bg-img: none;
  --surface: #0D0D0D;
  --surface-2: #151515;
  --border: #1C1C1C;
  --ink: #FFFFFF;
  --muted: #8A8A8A;
  --accent: #00F59C;
  --accent-ink: #00150C;
  --pos: #00F59C;
  --warn: #FFD60A;
  --neg: #FF3B5C;
  --c1: #00F59C;
  --c2: #FFD60A;
  --c3: #FF3B5C;
  --c4: #5B8CFF;
  --hero: linear-gradient(125deg, rgba(0,245,156,.38) 0, transparent 42%), repeating-linear-gradient(125deg, rgba(255,255,255,.035) 0 2px, transparent 2px 14px), #0A0A0A;
  --hero-ink: #FFFFFF;
  --hero-muted: #A0A0A0;
  --card-bg: linear-gradient(125deg, #00F59C 0, #00F59C 32%, #0A0A0A 32.2%);
  --grid: rgba(255,255,255,.07);
  --track: #1E1E1E;
  --font: "Inter", system-ui, sans-serif;
  --font-num: "Barlow Condensed", "Arial Narrow", sans-serif;
  --num-w: 800;
  --num-ls: 0;
  --num-scale: 1.18;
  --num-style: italic;
  --radius: 14px;
  --shadow: none;
  --blur: 0px;
}
```

## Especificación

Rendimiento. Energía de app deportiva: negro puro, verde eléctrico y números condensados.

Paleta
- Fondo #000000, superficies #0D0D0D, superficie elevada #151515, bordes #1C1C1C.
- Texto #FFFFFF, texto secundario #8A8A8A.
- Acento #00F59C (texto encima #00150C).
- Estados: positivo #00F59C, alerta #FFD60A, negativo #FF3B5C.
- Series de gráficos, en este orden: #00F59C, #FFD60A, #FF3B5C, #5B8CFF.

Tipografía: Inter para textos (labels en 600) y Barlow Condensed itálica 800 para todos los números, un 20% más grandes.
Formas: Radio 14px, bordes #1C1C1C, sin sombras.
Superficies: Panel protagonista con un barrido diagonal de verde al 38% desde la esquina y rayas diagonales muy sutiles.
Componentes: Botón primario verde eléctrico con texto casi negro; secundarios negros con borde. Píldoras compactas con texto en peso 600.
Gráficos: Rojo, amarillo y verde como semáforo para estados. Barras rectas sin redondeo, líneas de 3px, anillos gruesos con extremos redondeados.
Detalles: Sensación de velocidad: diagonales en lugar de curvas suaves.
Evitá: Fondos grises, degradés suaves, tipografías redondeadas.

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
