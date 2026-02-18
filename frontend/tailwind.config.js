module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lead: {
          900: "#09092a",
          800: "#120a22",
          700: "#1A0B2E",
          600: "#2D1B4E"
        },
        accent: {
          red: "#d93340",
          purple: "#a6249d",
          pink: "#ff6ec7",
          "purple-hover": "#8d1f88"
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