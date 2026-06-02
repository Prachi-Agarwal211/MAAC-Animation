import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E31837",
          dark: "#B8132C",
          glow: "rgba(227,24,55,0.18)",
        },
        accent: {
          DEFAULT: "#FF6B35",
        },
        bg: {
          primary: "#0C0C0C",
          secondary: "#111111",
          tertiary: "#161616",
          light: "#F5F0E8",
          card: "rgba(255,255,255,0.04)",
        },
        txt: {
          DEFAULT: "#F0EBE1",
          secondary: "#A8A29C",
          muted: "#6B6560",
          dark: "#0C0C0C",
          "dark-secondary": "#4A4540",
          "dark-muted": "#7A7570",
        },
        cream: "#F5F0E8",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        syne: ["var(--font-syne)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      spacing: {
        navbar: "80px",
        "demo-bar": "36px",
      },
      maxWidth: {
        content: "var(--content-max-width, 1600px)",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "marquee-left": "marqueeLeft 40s linear infinite",
        "marquee-right": "marqueeRight 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
