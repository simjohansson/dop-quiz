/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lemon: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        lime: {
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
          800: '#3f6212',
          900: '#365314',
        },
      },
      boxShadow: {
        'lemon-soft': '0 4px 20px -2px rgba(234, 179, 8, 0.15), 0 2px 6px -1px rgba(0, 0, 0, 0.05)',
        'lemon-card': '0 10px 30px -5px rgba(202, 138, 4, 0.12), 0 4px 10px -2px rgba(0, 0, 0, 0.04)',
        'lemon-glow': '0 0 25px rgba(250, 204, 21, 0.5)',
      },
      animation: {
        'bounce-short': 'bounce 0.5s ease-in-out 1',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'squeeze': 'squeeze 1.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-4deg)' },
          '50%': { transform: 'rotate(4deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        squeeze: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.08, 0.92)' },
        }
      }
    },
  },
  plugins: [],
}
