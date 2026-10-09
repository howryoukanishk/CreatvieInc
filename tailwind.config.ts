import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#142C25",
        ivory: "#F5F0E5",
        cream: "#EDE6D6",
        sage: "#D7E2D2",
        yellow: "#E7C45B",
        ink: "#202923",
        muted: "#69736B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { content: "1280px" },
      transitionTimingFunction: { editorial: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};

export default config;
