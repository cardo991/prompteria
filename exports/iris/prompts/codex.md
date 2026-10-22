## Tarea
Aplicar el estilo visual "Medianoche iridiscente" al proyecto.

## Alcance
- Tocá solo archivos de estilos: CSS o SCSS, tokens, config de Tailwind o tema.
- No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.

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

## Criterios de aceptación
- Todos los colores salen de variables o tokens; no quedan hex sueltos en componentes.
- Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
- El build y los tests pasan sin cambios en la lógica.

## Entrega
Un diff acotado y un resumen de los tokens que agregaste o cambiaste.
