import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        "border-emphasis": "hsl(var(--border-emphasis))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        "text-2": "hsl(var(--text-2))",
        "text-4": "hsl(var(--text-4))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        "accent-success": "hsl(var(--accent-success))",
        "accent-progress": "hsl(var(--accent-progress))",
        "accent-insight": "hsl(var(--accent-insight))",
        "accent-narrative": "hsl(var(--accent-narrative))",
        "accent-info": "hsl(var(--accent-info))",
        "accent-alert": "hsl(var(--accent-alert))",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
