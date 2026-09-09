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
        ink: "#0F172A",       // Deep slate/obsidian for primary text and UI buttons
        paper: "#F8FAFC",     // Modern crisp slate-50 background (replaces yellowed paper)
        path: "#059669",      // Vibrant modern emerald for progress, success, and active nodes
        waypoint: "#D97706",  // Clean amber for active targets and accents
        caution: "#DC2626",   // Crisp modern red for alerts and warnings
        "ink-40": "#64748B",  // Slate-500 for secondary labels and metadata
        hairline: "#E2E8F0",  // Crisp modern slate border (replaces dull gray)
      },
      fontFamily: {
        display: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
