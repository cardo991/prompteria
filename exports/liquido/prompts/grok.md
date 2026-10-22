Restyleá mi interfaz con el estilo "Vidrio líquido". Reglas:

1. No cambies la estructura, el layout, los textos, los datos, la lógica ni el tipo de gráficos: solo colores, tipografía, formas, superficies y el estilo visual de los componentes.
2. Usá exactamente esta especificación:

Vidrio líquido. Vidrio líquido claro: paneles esmerilados que dejan pasar el color del fondo.

Paleta
- Fondo #DCE3F3, superficies rgba(255,255,255,.5), superficie elevada rgba(255,255,255,.65), bordes rgba(255,255,255,.8).
- Texto #0E1424, texto secundario #4F5A76.
- Acento #2F6BFF (texto encima #FFFFFF).
- Estados: positivo #0F9F6E, alerta #C26A00, negativo #E0335F.
- Series de gráficos, en este orden: #2F6BFF, #FF7EB3, #A78BFA, #22B8CF.

Tipografía: Manrope. Números en peso 300; títulos en 600.
Formas: Radio 30px. Bordes blancos al 80% y un brillo interno arriba (inset 0 1px 0 rgba(255,255,255,.9)) con una sombra azulada suave.
Superficies: Fondo #DCE3F3 con tres manchas pastel grandes (rosa #FFA3CD, celeste #7DB8FF, amarillo #FFE08A). Paneles blancos al 50% con backdrop-filter blur(24px) saturate(1.4).
Componentes: Botón primario azul #2F6BFF; secundarios de vidrio. Píldoras de vidrio; la activa, azul.
Gráficos: Líneas de 2,5px con curvas suaves y relleno degradé muy transparente. Series: azul, rosa, lila, turquesa.
Detalles: Todo se siente liviano y luminoso; nada de negro puro.
Evitá: Bordes oscuros, sombras grises duras, fondos planos.

3. Contraste AA en todo el texto, foco de teclado visible, cifras tabulares en los números y que se vea bien tanto en pantalla grande como en celular.
4. Devolvé solo el código de estilos modificado (CSS o tokens), completo y listo para pegar, con una lista de 3 a 5 puntos de qué cambiaste.
