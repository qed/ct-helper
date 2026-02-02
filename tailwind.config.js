/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B2332', // burgundy/maroon
          hover: '#701C28',
          light: '#A63A4A',
        },
        secondary: {
          DEFAULT: '#2D4A3E', // forest green
          hover: '#1F332B',
          light: '#3E6656',
        },
        accent: {
          DEFAULT: '#C4A35A', // muted gold
          hover: '#B08F45',
        },
        background: {
          DEFAULT: '#FAF8F5', // warm cream
          paper: '#FFFFFF',
        },
        text: {
          primary: '#1F2937', // charcoal
          secondary: '#6B7280', // muted
          light: '#9CA3AF',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
