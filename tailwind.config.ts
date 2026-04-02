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
        primary: {
          DEFAULT: "#E31837",
          dark:    "#B8132C",
          light:   "#FF2D4D",
        },
        accent: {
          DEFAULT: "#FF6B35",
          light:   "#FF8C5A",
        },
        dark: {
          DEFAULT:    "#080808",
          surface:    "#0f0f0f",
          "surface-2":"#161616",
          50:         "#0f0f0f",
          100:        "#161616",
          200:        "#1e1e1e",
        },
        cream: "#f5f0e8",
        muted: "#6b6b6b",
      },
      fontFamily: {
        display: ["var(--font-syne)",   "sans-serif"],
        body:    ["var(--font-inter)",  "sans-serif"],
        ui:      ["var(--font-poppins)","sans-serif"],
        heading: ["var(--font-poppins)","sans-serif"],
        inter:   ["var(--font-inter)",  "sans-serif"],
        syne:    ["var(--font-syne)",   "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
