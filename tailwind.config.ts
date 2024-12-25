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
  			'body-pattern': 'linear-gradient(#192632 0%, #0075FF 100%)',
  			'settings-pattern': 'linear-gradient(#0075FF 50%, #192632 50%)'
  		},
  		textShadow: {
  			sm: '0 1px 0px #000',
  			DEFAULT: '0px 2px 0px black',
  			lg: '0 8px 16px #000'
  		},
  		spacing: {
  			'15': '60px',
  			'25': '100px',
  			'34': '136px',
  			'4.5': '18px',
  			'5.5': '22px',
  			'6.5': '26px',
  			'8.5': '34px',
  			'11.5': '46px'
  		},
  		colors: {
  			gray: {
  				'550': '#A8A8A8'
  			},
  			yellow: {
  				'500': '#FFEA00'
  			},
  			blue: {
  				'500': '#0075FF',
  				'700': '#203950',
  				'800': '#192632',
  				'900': '#051625'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		boxShadow: {
  			'text-shadow': '0px 0.6px 0px 0px #000000',
  			'green-shadow': '0px 0px 4px 0px #4FEA4F99'
  		},
  		fontFamily: {
  			rubik: [
  				'Rubik',
  				'sans-serif'
  			],
  			inter: [
  				'Inter',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			x: [
  				'10px',
  				'10px'
  			],
  			xs: [
  				'12px',
  				'12px'
  			],
  			'3xl': [
  				'32px',
  				'32px'
  			]
  		},
  		touchAction: {
  			carousel: 'pan-y pinch-zoom'
  		},
  		clipPath: {
  			custom: 'polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%, 25% 50%, 25% 0%)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
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
        { values: theme("textShadow") }
      );
      matchUtilities(
        {
          "touch-action": (value) => ({
            touchAction: value,
          }),
        },
        { values: theme("touchAction") }
      );
    }),
  ],
} satisfies Config;
