## Tarea
Aplicar el estilo visual "Bento claro" al proyecto.

## Alcance
- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.
- No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

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

## Criterios de aceptación
- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
- El build y los tests pasan sin cambios en la lógica.

## Entrega
Un diff acotado y un resumen de los tokens que agregaste o cambiaste.
