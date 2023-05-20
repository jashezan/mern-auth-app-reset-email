/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        mainColor: {
          default: "#8b4eff",
          50: "#f4f2ff",
          100: "#ede7ff",
          200: "#dcd2ff",
          300: "#c2afff",
          400: "#a681ff",
          500: "#8b4eff",
          600: "#7d28fd",
          700: "#7018e9",
          800: "#5d14c3",
          900: "#4e12a0",
          950: "#2f086d",
        },
      },
    },
  },
  plugins: [],
};
