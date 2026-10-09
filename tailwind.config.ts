import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#101828", soft: "#475467", mute: "#98A2B3" },
        paper: "#F7F8FA",
        line: "#E4E7EC",
        brand: { DEFAULT: "#1D4ED8", dark: "#1E3A8A", tint: "#EEF3FF" },
        crit: "#D92D20", weak: "#F79009", avg: "#EAB308", strong: "#12B76A", excel: "#0E9384",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
