/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },

        upDownSecond: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        upDown: "upDown 2s ease-in-out infinite",
        upDownSecond: "upDownSecond 2s ease-in-out infinite",
      },
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
