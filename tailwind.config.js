/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        surface: "#2d2d2d",
        crimson: {
          DEFAULT: "#b91c1c",
          light: "#ef4444",
          dark: "#7f1d1d",
        },
        accent: "#e5e7eb",
      },
      fontFamily: {
        /* Eckig, angular, edgy — für Body-Text, Labels, UI */
        sans: ["'Rajdhani'", "sans-serif"],
        /* Ornamental, abstrakt — für große Headings und Section-Titel */
        display: ["'Cinzel Decorative'", "serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(to bottom, rgba(18,18,18,0.45) 0%, rgba(18,18,18,0.80) 55%, rgba(18,18,18,1) 100%)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-ltr": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: 0, transform: "translateX(-16px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: 0, transform: "translateX(16px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        ornamentPulse: {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 0.8 },
        },
      },
      animation: {
        /* Marquee — deliberately slow and smooth */
        "marquee-rtl": "marquee 50s linear infinite",
        "marquee-rtl-slow": "marquee 70s linear infinite",
        "marquee-ltr": "marquee-ltr 50s linear infinite",
        "marquee-ltr-slow": "marquee-ltr 70s linear infinite",
        /* Entrance */
        "fade-in-up": "fadeInUp 0.9s ease both",
        "fade-in-left": "fadeInLeft 0.9s ease both",
        "fade-in-right": "fadeInRight 0.9s ease both",
        "fade-in": "fadeIn 0.7s ease both",
        /* Ornament */
        "ornament-pulse": "ornamentPulse 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
