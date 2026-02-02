/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ct-navy': '#32373c',
        'ct-gold': '#c9a227',
        'ct-teal': '#5a8f8f',
        'ct-sand': '#f5f5f5',
        'ct-clay': '#8b7355',
        'ct-moss': '#5a7247',
        'ct-dark': '#32373c',
      },
      backgroundImage: {
        'redeemer': "url('https://theredeemer.ca/wp-content/themes/TheRedeemer2017/assets/images/background.jpg')",
      },
    },
  },
  plugins: [],
}
