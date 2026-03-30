/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#8a95ff",
          dim: "rgba(138,149,255,0.12)",
          glow: "rgba(138,149,255,0.25)",
          border: "rgba(138,149,255,0.3)",
        },
      },
      fontFamily: {
        body: ["'Chiron GoRound TC'", "Nunito", "Inter", "sans-serif"],
        display: ["'Dela Gothic One'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
