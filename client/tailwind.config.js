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
          purple: '#6D28D9',      // Brand dark purple (violet-700)
          purpleLight: '#C4B5FD', // Brand light purple (violet-300)
          gold: '#C9A86A',         // Original gold
          goldLight: '#DFCDA7',    // Original gold light
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
