module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'lightbulb-green': 'rgb(108, 171, 133)',
        'lightbulb-dim': 'rgba(224, 185, 88, 0.5)',
        'lightbulb-yellow': 'rgb(224, 185, 88)',
      },
      maxWidth: {
        'kodekalender': '80rem',
      },
      width: {
        'kodekalender': '80rem',
      },
      fontSize: {
        'lightbulb': ['4.125rem', { lineHeight: '1' }],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}