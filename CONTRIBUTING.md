# Contributing / Cómo contribuir

## Add a style / Sumar un estilo

1. Start from a generated style / Partí de un estilo generado:
   ```bash
   npx prompteria create --name "Mi estilo" --primary "#0F766E" --no-apply
   ```
2. Move `prompteria/<id>.json` to `styles/<id>.json` and refine it: colors in `vars`, and the texts `concept`, `type`, `shape`, `surfaces`, `components`, `charts`, `details` and `avoid`, which become the prompt. / Mové el archivo a `styles/` y ajustalo.
3. Remove the `generated` field if you edited the palette by hand. / Sacá el campo `generated` si cambiaste la paleta a mano.
4. Run / Corré:
   ```bash
   npm install
   npm run build   # rebuilds src/core/styles.js and exports/
   npm test
   ```
5. Open the site (`npx serve .`), check your style on all six dashboards and go through the quality checklist. / Revisalo en los seis dashboards y pasá la checklist.
6. Open a PR with a screenshot. / Mandá un PR con una captura.

## Rules for a style / Reglas

- Text must reach 4.5:1 contrast against its background (body and secondary text). / Contraste AA en el texto.
- One accent with one job. / Un solo acento con una sola función.
- Original work only: no reproductions of another company's brand. / Solo diseños originales.
- `id` in kebab-case and equal to the filename. / El `id` igual al nombre del archivo.

## Other contributions / Otras contribuciones

New dashboards, chart recipes, tool-specific prompt formats and English translations are all welcome. / También suman dashboards, recetas de gráficos, formatos de prompt y traducciones al inglés.
