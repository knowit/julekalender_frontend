module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{ts,tsx,svg}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "lightbulb-green": "rgb(108, 171, 133)",
        "lightbulb-dim": "rgba(224, 185, 88, 0.5)",
        "lightbulb-yellow": "rgb(224, 185, 88)",
        "leaderboard-green": "rgba(37, 86, 80, 1)"
      },
      maxWidth: {
        // TODO: Should be a wrappercomponent of some sort instead.
        "kodekalender": "80rem"
      },
      width: {
        "kodekalender": "80rem"
      },
      fontSize: {
        "lightbulb": ["4.125rem", { lineHeight: "1" }]
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              code: {
                "&::before, &::after": {
                  content: "none !important"
                }
              }
            }
          }
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-children"),
    require("@whiterussianstudio/tailwind-easing")
  ]
}