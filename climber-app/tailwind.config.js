/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6363;',
          800: '#FF1313;',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        adelia: ["ADELIA", "cursive"],
      },
    },
  },
  plugins: [],
}