/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-text-color": "var(--dark-text-color)",
        "light-text-color": "var(--light-text-color)",
      },
    },
  },
  plugins: [],
}