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
        "leaderboard-green": "rgb(37, 86, 80)",
        "background-green": "rgb(18, 38, 32)"
      },
      maxWidth: {
        "kodekalender": "80rem"
      },
      width: {
        "kodekalender": "80rem",
        "avatar": "4.5rem"
      },
      margin: {
        "avatar": "4.5rem",
      },
      space: {
        "door-elements": "4rem"
      },
      fontSize: {
        "lightbulb": ["4.125rem", { lineHeight: "1" }]
      },
      keyframes: {
        stars: {
          // The background images are exactly 1000px tall, must use exact
          // transform to avoid tearing when the animation repeats. Setting 100%
          // will transform based on the size of the containing element which is
          // scaled to 200% screen height to always show the background image.
          to: { transform: "translateY(-1000px)" }
        }
      },
      animation: {
        "stars-background": "60s linear 0s infinite normal both running stars",
        "stars-midground":  "40s linear 0s infinite normal both running stars",
        "stars-foreground": "20s linear 0s infinite normal both running stars"
      },
      backgroundImage: (theme) => ({
        "stars-background": "url('/assets/svg/background.svg')",
        "stars-midground": "url('/assets/svg/midground.svg')",
        "stars-foreground": "url('/assets/svg/foreground.svg')"
      })
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
