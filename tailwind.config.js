/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f5f3ef",
        ink: "#1a1a1a",
        navy: {
          DEFAULT: "#1e3a5f",
          deep: "#0f1f35",
        },
        sand: "#e8e4dc",
        gold: "#a67c52",
      },
      fontFamily: {
        sans: [
          "Noto Sans JP",
          "Hiragino Sans",
          "system-ui",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Shippori Mincho",
          "Noto Serif JP",
          "Hiragino Mincho ProN",
          "serif",
        ],
        en: ["Cormorant Garamond", "Georgia", "serif"],
      },
      animation: {
        "bounce-slow": "bounceY 2.2s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
      keyframes: {
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
