/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary':'#ffd60a',
      },
      // Make custom breakpoints
      screens: {
        xxs: "360px",
        xs: "480px",
        ss: "620px",
        sm: "768px",
        cd: "890px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
    
  },
  // Make custome breakpoints
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none',   // Firefox
        },
      });
    }),
  ],
}

