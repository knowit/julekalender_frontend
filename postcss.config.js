const tailwindcss = require("tailwindcss")
const postcss100vhfix = require("postcss-100vh-fix")
const autoprefixer = require("autoprefixer")
const cssnano = require("cssnano")


const config = {
  plugins: [
    //Some plugins, like postcss-nested, need to run before Tailwind,
    tailwindcss(),
    postcss100vhfix(),
    autoprefixer(),
    process.env.NODE_ENV === "production" && cssnano({
      preset: "default"
    })
  ]
}

module.exports = config
