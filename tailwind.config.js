/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.html", "./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        secondary: "#FBBC04",
        newPrimary: "#0067A4",
        primary: "#10243C",
        faint: "#121425",
      },
      fontFamily: {
        sans: ["Rubik", "san-serif"],
        Merriweather: ["Merriweather", "san-serif"],
      },
    },
  },
  plugins: [],
};
