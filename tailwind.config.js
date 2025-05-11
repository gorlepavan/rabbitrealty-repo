/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe0e0',
          100: '#ffb3b3',
          200: '#ff8080',
          300: '#ff4d4d',
          400: '#ff2626',
          500: '#ff0000',
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        secondary: {
          50: '#f2f2f2',
          100: '#d9d9d9',
          200: '#bfbfbf',
          300: '#a6a6a6',
          400: '#8c8c8c',
          500: '#737373',
          600: '#595959',
          700: '#404040',
          800: '#262626',
          900: '#0d0d0d',
        },
        accent: {
          gold: '#D4AF37',
          silver: '#C0C0C0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
};