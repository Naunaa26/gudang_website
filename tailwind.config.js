/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-800": "#1f1f1f",
        "dark-900": "#18181B",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/forms")],
};
