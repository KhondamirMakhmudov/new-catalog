/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        anybody: ["AnyBody", "sans-serif"],
      },

      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
      },
      container: {
        center: true,
        padding: "50px",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};
