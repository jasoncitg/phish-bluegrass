import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Night fishing at the creek while the banjo plays" palette
        ink: {
          DEFAULT: "#0d1b2a",
          light: "#1b2838",
          muted: "#2d3f50",
        },
        gold: {
          DEFAULT: "#c9963e",
          light: "#e8b96f",
          pale: "#f5e0b0",
        },
        cream: {
          DEFAULT: "#e8dcc8",
          muted: "#9a8f7e",
        },
        water: {
          deep: "#0a1628",
          mid: "#0d2137",
          surface: "#1b3a5c",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "shimmer": "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "water-gradient": "linear-gradient(180deg, #0d1b2a 0%, #0a1628 50%, #061020 100%)",
        "gold-shimmer": "linear-gradient(90deg, transparent 25%, rgba(201,150,62,0.15) 50%, transparent 75%)",
      },
    },
  },
  plugins: [],
};
export default config;
