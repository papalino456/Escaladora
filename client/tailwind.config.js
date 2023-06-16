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
        },
        rosa: {
          500: '#FF00A2'
        },
        azulito: {
          500: '#1F9ACE'
        },
        verdesito: {
          500: '#0ED600'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        VenusRising: ["Venus Rising", "sans-serif"],
      },
    },
  },
  plugins: [],
}