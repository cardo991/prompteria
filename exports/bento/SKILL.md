---
name: estilo-bento
description: Aplica el estilo visual "Bento claro" de Promptería (grilla bento clara y limpia los números enormes son la decoración) a interfaces y dashboards. Usar cuando pidan el estilo Bento claro, este look, estos colores o "estilo bento".
---

# Estilo Bento claro

No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

## Tokens

Definí estas variables en el CSS global (o mapealas al sistema de tokens del proyecto) y usalas en todos los componentes:

```css
/* Promptería · Bento claro */
:root {
  --bg: #EDEDF0;
  --bg-img: none;
  --surface: #FFFFFF;
  --surface-2: #F4F4F6;
  --border: transparent;
  --ink: #0D0D12;
  --muted: #6E6F7C;
  --accent: #FF5A1F;
  --accent-ink: #FFFFFF;
  --pos: #12A150;
  --warn: #FF8A00;
  --neg: #E11D48;
  --c1: #FF5A1F;
  --c2: #0D0D12;
  --c3: #FFB38A;
  --c4: #A3A3AE;
  --hero: radial-gradient(circle at 100% 0, #FF5A1F 0, transparent 50%), radial-gradient(circle at 0 100%, #3A1A10 0, transparent 60%), #0D0D12;
  --hero-ink: #FFFFFF;
  --hero-muted: #B9B9C4;
  --card-bg: radial-gradient(circle at 100% 0, #FF5A1F 0, transparent 55%), radial-gradient(circle at 0 100%, #3A1A10 0, transparent 60%), #0D0D12;
  --grid: rgba(13,13,18,.07);
  --track: #EEEEF2;
  --font: "Inter Tight", "Inter", system-ui, sans-serif;
  --font-num: "Inter Tight", "Inter", system-ui, sans-serif;
  --num-w: 800;
  --num-ls: -0.05em;
  --num-scale: 1;
  --num-style: normal;
  --radius: 28px;
  --shadow: 0 1px 2px rgba(0,0,0,.04);
  --blur: 0px;
}
```

## Especificación

Bento claro. Grilla bento clara y limpia: los números enormes son la decoración.

Paleta
- Fondo #EDEDF0, superficies #FFFFFF, superficie elevada #F4F4F6, bordes transparent.
- Texto #0D0D12, texto secundario #6E6F7C.
- Acento #FF5A1F (texto encima #FFFFFF).
- Estados: positivo #12A150, alerta #FF8A00, negativo #E11D48.
- Series de gráficos, en este orden: #FF5A1F, #0D0D12, #FFB38A, #A3A3AE.

Tipografía: Inter Tight. Números en peso 800 con tracking -0.05em, muy grandes y apretados; textos en 400 y 500.
Formas: Radio 28px. Paneles sin borde, sombra casi imperceptible (0 1px 2px rgba(0,0,0,.04)). Separación de 16px entre paneles.
Superficies: Fondo #EDEDF0 y paneles blancos. El panel protagonista va invertido: negro #0D0D12 con un resplandor naranja en la esquina y texto blanco.
Componentes: Botón primario naranja con texto blanco; secundarios grises claros sin borde. Píldoras grises; la activa, negra.
Gráficos: Barras naranjas con la destacada sólida y el resto al 35%. Líneas gruesas (3px) sin relleno. Grilla gris muy suave.
Detalles: Contraste fuerte entre el panel negro y el resto, que marca dónde mirar primero.
Evitá: Bordes visibles, sombras grandes, más de un color de acento.

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
