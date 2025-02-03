/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "collect-button-vertical-sway":
          "collect-button-vertical-sway 1s infinite linear",
        "collect-button-coloring": "collect-button-coloring 1s infinite linear",
        "collect-button-locked-coloring":
          "collect-button-locked-coloring 1s infinite linear",
        "collect-button-violet-coloring":
          "collect-button-violet-coloring 1s infinite linear",
        "bp-glow-running": "bp-glow-running 2s infinite linear",
        "card-glow-running": "card-glow-running 2s infinite linear",
        "card-border-coloring": "card-border-coloring 3s linear infinite",
      },
      keyframes: {
        "collect-button-vertical-sway": {
          "0%, 100%": {
            transform: "translateY(-2px)",
          },
          "50%": {
            transform: "translateY(0px)",
          },
        },
        "collect-button-coloring": {
          "0%, 20%, 80%, 100%": {
            fill: "#02DB07",
          },
          "50%": {
            fill: "#76FF7A",
          },
        },
        "collect-button-locked-coloring": {
          "0%, 20%, 80%, 100%": {
            fill: "#EFC609",
          },
          "50%": {
            fill: "#FFE981",
          },
        },
        "collect-button-violet-coloring": {
          "0%, 20%, 80%, 100%": {
            fill: "#7E81F3",
          },
          "50%": {
            fill: "#ADAFF9",
          },
        },
        "bp-glow-running": {
          "0%, 50%": {
            transform: "translateX(-120%) rotateZ(15deg)",
          },
          "100%": {
            transform: "translateX(120%) rotateZ(15deg)",
          },
        },
        "card-glow-running": {
          "0%, 50%": {
            transform: "rotate(30deg) translate(-170%, -15%)",
          },
          "100%": {
            transform: "rotate(30deg) translate(200%, -15%)",
          },
        },
        "card-border-coloring": {
          from: {
            transform: "rotate(0)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
      backgroundImage: {
        "body-pattern": "linear-gradient(#192632 0%, #0075FF 100%)",
        "settings-pattern": "linear-gradient(#0075FF 50%, #192632 50%)",
        "bp-regular-item-unlocked-pattern":
          "linear-gradient(to bottom, #09376B, #093069)",
        "bp-regular-item-locked-pattern":
          "linear-gradient(to bottom, #29D6FF, #2596E4)",
        "bp-premium-item-unlocked-pattern":
          "linear-gradient(to bottom, #471A6A, #340C62)",
        "bp-premium-item-locked-pattern":
          "linear-gradient(to bottom, #EE84FF, #7740F5)",
        "bp-regular-glow-pattern":
          "linear-gradient(270deg, #B0FFFF 0%, #FFFFFF 6%, #9AFFFF 21.5%, #30FFFF 100%)",
        "bp-premium-glow-pattern":
          "linear-gradient(270deg, #F4B0FF 0%, #FFFFFF 6%, #F2A1FF 21.5%, #EE84FF 100%)",
        "bp-item-shadow-pattern":
          "radial-gradient(50% 50% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0.2) 100%)",
        "bp-star-glow-pattern":
          "linear-gradient(270deg, #FF86E5 0%, #FFFFFF 10.5%, rgba(255, 60, 213, 0.15) 100%)",
        "bp-bottom-menu-pattern":
          "linear-gradient(181.48deg, #5B6F89 1.35%, #424D63 98.84%)",
        "card-glow-pattern":
          "linear-gradient(270deg, rgba(255, 255, 255, 0.5) 10%, rgba(255, 255, 255, 0) 100%)",
        "card-blue-bg-pattern":
          "radial-gradient(50% 88.48% at 50% 50%, rgba(0, 105, 177, 0) 0%, #0069B1 100%)",
        "card-orange-bg-pattern":
          "radial-gradient(50% 88.48% at 50% 50%, rgba(136, 51, 8, 0) 0%, #883308 100%)",
        "card-indigo-bg-pattern":
          "radial-gradient(50% 88.48% at 50% 50%, rgba(64, 59, 183, 0) 0%, #403BB7 100%)",
      },
      textShadow: {
        sm: "0 1px 0px #000",
        DEFAULT: "0px 2px 0px black",
        lg: "0 8px 16px #000",
      },
      backgroundPosition: {
        "center-top": "center top",
      },
      spacing: {
        15: "60px",
        25: "100px",
        34: "136px",
        4.5: "18px",
        5.5: "22px",
        6.5: "26px",
        7.5: "30px",
        8.5: "34px",
        9.5: "38px",
        11.5: "46px",
        13: "52px",
        13.5: "54px",
        16: "64px",
        17: "68px",
        18: "72px",
        23: "92px",
        26: "104px",
        30: "120px",
        38: "152px",
        60: "240px",
        74: "296px",
        75: "300px",
      },
      colors: {
        gray: {
          "550": "#A8A8A8",
        },
        yellow: {
          450: "#FFCE08",
          500: "#FFEA00",
        },
        red: {
          550: "#FF453A",
        },
        orange: { 550: "#E88C0E" },
        blue: {
          400: "#365D82",
          500: "#0075FF",
          700: "#203950",
          800: "#192632",
          900: "#051625",
          950: "#1C2F41",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        "text-shadow": "0px 0.6px 0px 0px #000000",
        "green-shadow": "0px 0px 4px 0px #4FEA4F99",
        modal: "0 -8px 12px 0 rgba(5, 22, 37, .6)",
        "inset-base": "inset 0 0 0 1px #FFFFFF",
        "inset-black":
          "inset 0 0 0 1px black, inset 0 2px 4px rgba(0, 0, 0, 0.05)",
        "inset-btn": "inset 0px -1px 0.5px rgba(255, 255, 255, 0.2)",
        link: "0px 1px 1px rgba(0, 0, 0, 0.2)",
        "inner-light-top": "inset 0 2px 1px rgba(255, 255, 255, 0.3)",
        "inner-light-bottom":
          "inset 0 -1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 0.5px rgba(255, 255, 255, 0.3)",
        "battle-pass-combined":
          "inset 0 1.5px 0.5px rgba(136, 51, 8, 0.6), -1px 1px 1px rgba(255, 255, 255, 0.6), 1px 1px 1px rgba(255, 255,255 ,0.6)",
        "inner-light":
          "inset 0 2px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 1px rgba(255, 255, 255, 0.3), inset 0 -1px 0.5px rgba(255, 255, 255, 0.3)",
        "bp-bottom-menu": "0px 4px 4px 0px rgba(255, 255, 255, 0.25) inset",
        "heroes-stat-indicator-inner-dim": "-1px 2px 1px 0px #00000033 inset",
        "heroes-stat-indicator-glow": "0px 0px 4px 0px #FFCC0099"
      },
      fontFamily: {
        rubik: ["Rubik, sans-serif"],
        inter: ["Inter, sans-serif"],
      },
      fontSize: {
        x: ["10px", "10px"],
        xs: ["12px", "12px"],
        "3xl": ["32px", "32px"],
      },
      touchAction: {
        carousel: "pan-y pinch-zoom",
      },
      clipPath: {
        custom:
          "polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%, 25% 50%, 25% 0%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "4xl": "32px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
      matchUtilities(
        {
          "touch-action": (value) => ({
            touchAction: value,
          }),
        },
        { values: theme("touchAction") },
      );
    }),
  ],
} satisfies Config;
