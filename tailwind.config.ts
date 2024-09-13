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
      blue: "var(--blue)",
      green: "var(--green)",
      red: "var(--red)",
      indigo: "var(--indigo)",
      orange: "var(--orange)",
      cyan: "var(--cyan)",
      violet: "var(--violet)",
      grey: "var(--grey)",
    },
  },
  plugins: [],
};
export default config;
