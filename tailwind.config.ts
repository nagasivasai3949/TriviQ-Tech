import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1437",
          deep: "#1E3A8A",
          teal: "#2DD4DB",
          ice: "#E6FAFB",
          ink: "#0A0F1F",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #2DD4DB 0%, #1E3A8A 100%)",
        "hero-radial":
          "radial-gradient(ellipse at 20% 10%, rgba(45,212,219,0.18), transparent 50%), radial-gradient(ellipse at 80% 90%, rgba(30,58,138,0.35), transparent 55%)",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out both",
        "float-slow": "float 9s ease-in-out infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
