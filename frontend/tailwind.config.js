module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lead: {
          900: "#09092a", // fondo oscuro profundo
          800: "#36042f",
          700: "#3a1e6a",
          600: "#b62667",
          500: "#a0218b",
          pink: "#ff86ff"
        },
        accent: {
          pink: "#b62667"
        }
      },
      fontFamily: {
        heading: ["'League Spartan'", "sans-serif"],
        body: ["Roboto", "sans-serif"]
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: [],
}