## Tarea
Aplicar el estilo visual "Rendimiento" al proyecto.

## Alcance
- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.
- No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

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

## Criterios de aceptación
- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
- El build y los tests pasan sin cambios en la lógica.

## Entrega
Un diff acotado y un resumen de los tokens que agregaste o cambiaste.
