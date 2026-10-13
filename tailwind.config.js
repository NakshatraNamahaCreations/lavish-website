export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        primarysec: "var(--primarysec-color)",
        secondary: "var(--secondary-color)",
        light: "var(--light-color)",
        text: "var(--text-color)",
      },
      plugins: [require('@tailwindcss/line-clamp')],
      // animation: {
      //   "spin-slow": "spin 3s linear infinite", // Customize the spin duration here (3s for slow)
      // },
    },
  },
  plugins: [],
};
