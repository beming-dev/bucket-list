const colors = require("tailwindcss/colors");
const scrollbar = require("tailwind-scrollbar");
module.exports = {
  content: [
    "./renderer/pages/**/*.{js,ts,jsx,tsx}",
    "./renderer/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // use colors only specified
      white: colors.white,
      gray: colors.gray,
      blue: colors.blue,
      purple: colors.purple,
      black: colors.black,
    },
    extend: {
      fontFamily: {},
    },
  },
  plugins: [scrollbar],
};
