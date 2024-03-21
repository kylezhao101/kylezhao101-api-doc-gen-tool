module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "custom-blue": "#3945FC",
        "custom-gray": "#BEBEBE",
        "custom-background-gray": "#E8ECF1",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};