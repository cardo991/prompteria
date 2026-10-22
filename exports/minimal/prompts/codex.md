## Tarea
Aplicar el estilo visual "Minimal pro" al proyecto.

## Alcance
- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.
- No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

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

## Criterios de aceptación
- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
- El build y los tests pasan sin cambios en la lógica.

## Entrega
Un diff acotado y un resumen de los tokens que agregaste o cambiaste.
