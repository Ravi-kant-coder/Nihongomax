/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Required for dark mode with next-themes
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // if you’re also using /pages
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blinkFade: {
          "0%, 100%": { opacity: "0", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      animation: {
        blinkFade: "blinkFade 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
