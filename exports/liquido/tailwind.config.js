// Promptería · Vidrio líquido
// Importá tokens.css en tu CSS global y sumá esta config.
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "background": "var(--bg)",
        "surface": "var(--surface)",
        "surface-2": "var(--surface-2)",
        "border": "var(--border)",
        "ink": "var(--ink)",
        "muted": "var(--muted)",
        "accent": {
          "DEFAULT": "var(--accent)",
          "ink": "var(--accent-ink)"
        },
        "pos": "var(--pos)",
        "warn": "var(--warn)",
        "neg": "var(--neg)",
        "chart": {
          "1": "var(--c1)",
          "2": "var(--c2)",
          "3": "var(--c3)",
          "4": "var(--c4)"
        }
      },
      borderRadius: { DEFAULT: '30px' },
      fontFamily: {'sans':['Manrope','system-ui','sans-serif'],'num':['Manrope','system-ui','sans-serif']}
    }
  }
};
