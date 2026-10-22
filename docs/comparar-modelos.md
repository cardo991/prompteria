# Comparar modelos

La idea es ver cómo resuelve cada herramienta el mismo pedido, sin ayuda extra.

## Método

1. En el Constructor elegí dashboard, estilo y stack. Usá siempre el mismo prompt para todas las herramientas; cambiá solo la pestaña de herramienta si querés el formato que mejor entiende cada una, y anotalo.
2. Corré el prompt en cada herramienta en una conversación nueva, sin archivos ni contexto previo.
3. No corrijas nada a mano. Si hizo falta un segundo mensaje, anotalo en las notas.
4. Abrí el resultado a 1440 × 900 y sacá una captura. Guardala como `comparaciones/img/<dashboard>-<estilo>-<herramienta>.png`.
5. Sumá la entrada en `comparaciones/comparaciones.js` con el modelo exacto que usaste y la fecha.

## Qué mirar

- ¿Respetó la paleta y las series de gráficos en orden?
- ¿Respetó la disposición pedida, también en celular?
- ¿Pasa la checklist de calidad?
- ¿Cuántos mensajes hicieron falta?

Los modelos cambian seguido: poné siempre la fecha y el nombre exacto del modelo.
