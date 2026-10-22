---
name: prompteria
description: Aplica estilos visuales de Promptería (Aurora oliva, Medianoche iridiscente, Bento claro, Grafito y cobre, Rendimiento, Vidrio líquido, Minimal pro) a interfaces y dashboards, o arma prompts de dashboards completos. Usar cuando pidan "estilo de Promptería", uno de esos nombres, un tema de Power BI de esos estilos o un dashboard con ese look.
---

# Promptería

Este repo define siete estilos visuales y los genera en varios formatos. Usalo así:

1. Si el MCP server `prompteria` está conectado, preferí sus herramientas: `list_styles`, `get_style_prompt`, `build_dashboard_prompt`, `get_tokens`, `create_style` y `quality_checklist`.
2. Si no, leé `exports/<estilo>/`: ahí están `tokens.css`, `tailwind.config.js`, `tokens.json`, `powerbi-theme.json`, `SKILL.md`, `AGENTS.md` y la regla de Cursor.
3. Para aplicar un estilo a un proyecto existente, seguí `exports/<estilo>/SKILL.md`: solo cambia el look, nunca estructura, textos, datos ni lógica.
4. Antes de terminar, recorré la checklist de calidad.

Para crear un estilo desde un color de marca: herramienta `create_style` del MCP o `npx prompteria create --name "Marca" --primary "#hex"`.

Para cambiar un estilo del repo, editá `styles/<id>.json` y corré `npm run build`. Nunca edites `src/core/styles.js` ni `exports/` a mano.
