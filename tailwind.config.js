/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx,mdx}", "./components/**/*.{js,jsx,ts,tsx,mdx}", "./lib/**/*.{js,jsx,ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // ── Navy (dark blue) ──────────────────────────────
        navy: {
          50:  "#f0f4f9",
          100: "#dbe4ef",
          200: "#b8c8db",
          300: "#8fa4bd",
          400: "#5f7a99",
          500: "#405a75",
          600: "#2d4459",
          700: "#1f3143",
          800: "#16232f",
          900: "#101923",
          950: "#0a0f16",
        },
        // ── Gold (accent) ─────────────────────────────────
        gold: {
          50:  "#fdf9ec",
          100: "#faf0c9",
          200: "#f4df94",
          300: "#ecc95f",
          400: "#e4b23a",
          500: "#d4af37", // ← original gold
          600: "#b08d2a",
          700: "#8c6d22",
          800: "#6b521c",
          900: "#4f3c15",
          950: "#2d2209",
        },
      },
      fontFamily: {
        serif: ["Charter", "'Iowan Old Style'", "'Palatino Linotype'", "Palatino", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "'Segoe UI'", "Roboto", "'Helvetica Neue'", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};