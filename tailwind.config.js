module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'lightbulb-green': 'rgb(108, 171, 133)',
        'lightbulb-dim': 'rgba(224, 185, 88, 0.5)',
        'lightbulb-yellow': 'rgb(224, 185, 88)',
        'leaderboard-green': 'rgba(37, 86, 80, 1)'
      },
      maxWidth: {
        'kodekalender': '80rem',
      },
      spacing: {
        // Helps with absolute size where needed
        '102': '25.5rem',
        '104': '26rem',
        '128': '32rem',
      },
      width: {
        'kodekalender': '80rem',
      },
      fontSize: {
        'lightbulb': ['4.125rem', { lineHeight: '1' }],
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              code: {
                '&::after': {
                  content: 'none !important',
                },
              },
            },
          },
        },
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
