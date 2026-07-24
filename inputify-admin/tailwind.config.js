/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF7A00",
        secondary: "#FFA64D",
        dark: "#1A1A1A",
        light: "#F5F7FA",
      },
    },
  },
  plugins: [],
}