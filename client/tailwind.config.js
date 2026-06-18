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
        luxury: {
          bg: '#F5F5F5',
          bgDark: '#0A0A0A',
          black: '#000000',
          gray: '#D9D9D9',
          gold: '#C9A86A',
          goldLight: '#DFCDA7',
        }
      },
      fontFamily: {
        editorial: ['"Playfair Display"', 'serif'],
        sans: ['Outfit', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        extreme: '0.4em',
      },
      animation: {
        'infinite-marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
