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
        // Tiger palette - Awwwards dark mode
        tiger: {
          black: "#080808",
          surface: "#101010",
          accent: "#c8ff00", // Electric lime
          accentDim: "rgba(200, 255, 0, 0.08)",
          text: "#f5f0e8",
          muted: "#6b6b6b",
          glow: "rgba(200, 255, 0, 0.15)",
        },
        primary: {
          DEFAULT: "#E31837",
          dark: "#B8132C",
          light: "#FF2D4D",
        },
        secondary: {
          DEFAULT: "#1A1A2E",
          light: "#16213E",
        },
        accent: {
          DEFAULT: "#FF6B35",
          light: "#FF8C5A",
        },
        dark: {
          DEFAULT: "#0F0F1A",
          50: "#1A1A2E",
          100: "#16213E",
          200: "#0F3460",
        },
        surface: {
          DEFAULT: "#F8FAFC",
          dark: "#111827",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(227, 24, 55, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(227, 24, 55, 0.6)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #16213E 100%)",
      },
      perspective: {
        "1000": "1000px",
      },
    },
  },
  plugins: [],
};
export default config;
