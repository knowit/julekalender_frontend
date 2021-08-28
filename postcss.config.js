const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const config = {
	plugins: [
    //Some plugins, like postcss-nested, need to run before Tailwind,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer(),
    process.env.NODE_ENV === 'production' && cssnano({
      preset: "default",
    })
  ],
};

module.exports = config;
