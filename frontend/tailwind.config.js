/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        swiggy: {
          orange: '#FC8019',
          dark: '#1C1C24',
          accent: '#FF5200',
          light: '#FFF6F0',
          surface: '#F4F5F7'
        }
      }
    },
  },
  plugins: [],
}
