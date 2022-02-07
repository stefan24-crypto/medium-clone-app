module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeTop: {
          "0%": { opacity: "0", top: "40%" },
          "100%": { opacity: "1", top: "50%" },
        },
        animation: {
          fadeTop: "fadeTop 0.5s ease-in-out",
        },
      },
    },
  },
  plugins: [],
};
