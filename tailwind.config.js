module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '80vw': '80vw',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}