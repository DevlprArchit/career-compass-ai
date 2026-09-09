import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12203A",       // Deep navy-ink for primary text and buttons
        paper: "#F6F5F1",     // Cool off-white background
        path: "#2F6F5E",      // Muted pine-green for progress and completed nodes
        waypoint: "#E2A33B",  // Amber-gold accent for "You are here" and Score Ring
        caution: "#B3452C",   // Muted brick red for job warnings and weak skills
        "ink-40": "#8A93A6",  // Secondary metadata and disabled nodes
        hairline: "#DCDAD2",  // Minimal clean dividers and borders
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
