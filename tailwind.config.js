/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'casino-green': {
          DEFAULT: '#0a5c36',
          dark: '#0b6e42', // Brighter, more vibrant green for dark mode
        },
      },
    },
  },
  plugins: [],
}
