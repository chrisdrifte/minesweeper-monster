import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        explode: "shake 100ms 5",
      },
      keyframes: {
        shake: {
          "0%": { transform: "translate(0, 0) rotate(0deg)" },
          "25%": { transform: "translate(2px, 2px) rotate(2deg)" },
          "50%": { transform: "translate(0, 0) rotate(0deg)" },
          "75%": { transform: "translate(-2px, 2px) rotate(-2deg)" },
          "100%": { transform: "translate(0, 0) rotate(0deg)" },
        },
      },
    },
    colors: {
      transparent: "transparent",
      bg: "var(--bg)",
      "fg-50": "var(--fg-50)",
      "fg-100": "var(--fg-100)",
      "fg-alt": "var(--fg-alt)",
      one: "var(--one)",
      two: "var(--two)",
      three: "var(--three)",
      four: "var(--four)",
      five: "var(--five)",
      six: "var(--six)",
      seven: "var(--seven)",
      eight: "var(--eight)",
      "hidden-bg": "var(--hidden-bg)",
      "mine-bg": "var(--mine-bg)",
      "mine-fg": "var(--mine-fg)",
      "flag-bg": "var(--flag-bg)",
      "flag-fg": "var(--flag-fg)",
      "highlight-click": "var(--highlight-click)",
      "highlight-dig": "var(--highlight-dig)",
      "annotate-mine": "var(--annotate-mine)",
      "annotate-safe": "var(--annotate-safe)",
      "annotate-info": "var(--annotate-info)",
    },
  },
  plugins: [],
};
export default config;
