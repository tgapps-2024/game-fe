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
      backgroundImage: {
        "body-pattern": "linear-gradient(#192632 0%, #0075FF 100%)",
        "settings-pattern": "linear-gradient(#0075FF 50%, #192632 50%)",
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
        16: "64px",
        17: "68px",
        18: "72px",
        23: "92px",
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
          500: "#0075FF",
          700: "#203950",
          800: "#192632",
          900: "#051625",
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
