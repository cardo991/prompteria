## Tarea
Aplicar el estilo visual "Aurora oliva" al proyecto.

## Alcance
- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.
- No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

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

## Criterios de aceptación
- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
- El build y los tests pasan sin cambios en la lógica.

## Entrega
Un diff acotado y un resumen de los tokens que agregaste o cambiaste.
