import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          /* Primary palette */
          ivory: "#F8F7F4",     // base bg
          paper: "#F1F2EE",     // soft section
          ink: "#0F172A",       // primary text + dark spotlight bg
          inkDeep: "#0A1020",   // footer
          /* Brand */
          primary: "#1E40AF",   // cobalt indigo (trust)
          primaryDark: "#1E3A8A",
          accent: "#0891B2",    // cyan (innovation)
          accentSoft: "#E0F2FE",
          violet: "#6366F1",    // premium / AI
          cta: "#EA580C",       // warm orange (conversion)
          ctaDark: "#C2410C",
          amber: "#F59E0B",
          rose: "#F43F5E",
          /* Legacy aliases — kept so existing class names still resolve */
          navy: "#0F172A",
          deep: "#1E3A8A",
          teal: "#0891B2",
          ice: "#E6FAFB",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-space)", "var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0891B2 0%, #1E40AF 100%)",
        "brand-gradient-warm": "linear-gradient(135deg, #EA580C 0%, #F43F5E 100%)",
        "hero-radial":
          "radial-gradient(ellipse at 20% 10%, rgba(8,145,178,0.10), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(30,64,175,0.12), transparent 55%)",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out both",
        "fade-up-slow": "fadeUp 1s ease-out both",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 12s ease-in-out infinite",
        marquee: "marquee 45s linear infinite",
        "slide-in-left": "slideInLeft 0.6s ease-out both",
        "slide-in-right": "slideInRight 0.6s ease-out both",
        "scale-up": "scaleUp 0.5s ease-out both",
        "blur-in": "blurIn 0.6s ease-out both",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blurIn: {
          "0%": { opacity: "0", filter: "blur(8px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
      boxShadow: {
        glow: "0 10px 30px -10px rgba(30, 64, 175, 0.35)",
        "glow-lg": "0 16px 50px -12px rgba(30, 64, 175, 0.45)",
        cta: "0 10px 30px -8px rgba(234, 88, 12, 0.45)",
        "cta-lg": "0 18px 45px -10px rgba(234, 88, 12, 0.55)",
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.04)",
        "soft-lg": "0 4px 12px rgba(15, 23, 42, 0.06), 0 16px 40px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-glow": {
          textShadow: "0 0 20px rgba(30, 64, 175, 0.25)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
      });
    }),
  ],
};

export default config;
