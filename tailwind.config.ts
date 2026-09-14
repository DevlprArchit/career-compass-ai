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
        ink: "#1E1B18",               // Overworld Deep Charcoal / Earth Ink
        paper: "#F2EAD6",             // Overworld Warm Cartographic Parchment Canvas
        surface: "#FAF6EE",           // Overworld Crisp Parchment Card Surface
        "surface-muted": "#EAE0CA",   // Overworld Shaded Secondary Parchment
        path: "#2D6A4F",              // Overworld Quest / Health Forest Green
        "path-hover": "#1B4332",      // Overworld Deep Forest Green
        "brand-cyan": "#2A6F97",      // Overworld Mana Azure
        "brand-indigo": "#3B4D80",    // Overworld Arcane Indigo
        "brand-purple": "#6B4C85",    // Overworld Mystic Violet
        "brand-emerald": "#2D6A4F",   // Overworld Quest Green
        "brand-amber": "#D9822B",     // Overworld Gold Coin / XP
        "apple-blue": "#2A6F97",      // Overworld Mana
        "apple-green": "#2D6A4F",     // Overworld Forest
        "apple-amber": "#D9822B",     // Overworld Gold
        "apple-red": "#BA3B46",       // Overworld Dungeon Ruby
        waypoint: "#D9822B",          // Overworld Gold Coin / Target
        caution: "#BA3B46",           // Overworld Dungeon Ruby Red
        "ink-40": "#685F53",          // Overworld Muted Earth Sepia
        "ink-60": "#4A4339",          // Overworld Medium Dark Sepia
        hairline: "#D8CEBA",          // Overworld Parchment Border
        "hairline-dark": "#1E1B18",   // Overworld Chunky Ink Border (2px)
        overworld: {
          parchment: "#F2EAD6",
          surface: "#FAF6EE",
          "surface-deep": "#EAE0CA",
          ink: "#1E1B18",
          "ink-muted": "#685F53",
          quest: "#2D6A4F",
          coin: "#D9822B",
          mana: "#2A6F97",
          hazard: "#BA3B46",
          shadow: "#D8CEBA",
        },
        // Legacy compatibility mappings
        "void-950": "#1E1B18",
        "void-900": "#26221E",
        "void-850": "#302B26",
        "void-800": "#3C3630",
        "void-700": "#4D463E",
        "cyber-cyan": "#2A6F97",
        "cyber-blue": "#468FAF",
        "cyber-indigo": "#3B4D80",
        "cyber-violet": "#6B4C85",
        "cyber-fuchsia": "#A64273",
        "cyber-amber": "#D9822B",
        "cyber-gold": "#E09F3E",
        "cyber-emerald": "#2D6A4F",
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        display: ['"Inter"', '"Plus Jakarta Sans"', "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
        pixel: ['"Inter"', '"Space Mono"', "sans-serif"],
        mono: ['"Space Mono"', '"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        "overworld-sm": "2px 2px 0px #1E1B18",
        "overworld": "3px 3px 0px #1E1B18",
        "overworld-lg": "5px 5px 0px #1E1B18",
        "overworld-pressed": "1px 1px 0px #1E1B18",
        "overworld-gold": "3px 3px 0px #9A5B15",
        "overworld-quest": "3px 3px 0px #1B4332",
        "card-tactile": "3px 3px 0px #1E1B18",
        "card-hover": "5px 5px 0px #1E1B18",
        "glass-specular": "3px 3px 0px #1E1B18",
        "glow-emerald": "0 0 15px rgba(45, 106, 79, 0.4)",
        "glow-amber": "0 0 15px rgba(217, 130, 43, 0.4)",
        "tactile-button": "3px 3px 0px #1E1B18",
        "tactile-emerald": "3px 3px 0px #1B4332",
        "apple-card": "3px 3px 0px #1E1B18",
        "apple-hover": "5px 5px 0px #1E1B18",
        "apple-nav": "0 2px 0px #1E1B18",
        "uiverse-cyan": "3px 3px 0px #1A4968",
        "uiverse-purple": "3px 3px 0px #422E54",
        "uiverse-gold": "3px 3px 0px #9A5B15",
        "uiverse-glow": "0 10px 30px -10px rgba(0, 240, 255, 0.25), 0 0 0 1px rgba(0, 240, 255, 0.15)",
      },
      animation: {
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-glow": "pulse-glow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
        "gradient-x": "gradient-x 6s ease infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "uiverse-spin": "uiverse-spin 4s linear infinite",
        "uiverse-spin-slow": "uiverse-spin 8s linear infinite",
        "uiverse-pulse-glow": "uiverse-pulse-glow 3s ease-in-out infinite",
        "uiverse-shimmer": "uiverse-shimmer 2.5s ease-in-out infinite",
        "border-beam": "border-beam 6s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "uiverse-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "uiverse-pulse-glow": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        "uiverse-shimmer": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "border-beam": {
          "100%": { "offset-distance": "100%" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
