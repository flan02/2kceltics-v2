import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
        "3xl": "1920px",
        "xs": "500px"
      },
    },
    extend: {
      backgroundImage: {
        'fissure': "url('../../public/fissure.png')",
      },
      lineHeight: {
        'extra-loose': '2.5',
        '12': '3rem',
      },
      textShadow: {
        'default': '2px 2px 4px rgba(0, 128, 0, 0.4)',
        'md': '3px 3px 6px rgba(0, 128, 0, 0.5)',
        'lg': '5px 5px 10px rgba(0, 0, 0, 0.6)',
        'xl': '7px 7px 14px rgba(0, 0, 0, 0.7)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'celtics': '#007A33',
        'purple': '#3f3cbb',
        'night': {
          10: '#e2e3e5',  // Tonalidad más clara
          20: '#b9bbbe',
          30: '#8f9195',
          40: '#666a6d',
          50: '#3d4145',  // Tonalidad intermedia
          60: '#2f3236',
          70: '#25272b',
          80: '#1d1f22',
          90: '#191b1e',
          100: '#17191c', // Color base
        },
        'nighty': '#0f0f1a',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'emerald': '#007A33',
        'sunset': '#ffcc00',
        'slate': '#708090',

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "marquee-x": {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "100%": {
            transform: "translateY(-50%)",
          }
        },
        "fade-in": {
          from: {
            opacity: "0",
          },
          to: {
            opacity: "1",
          },
        },
        flashing: {
          "0%, 100%": { opacity: '0.2' },
          "20%": { opacity: '1' },
        }
      },
      animation: {
        "fade-in": "fade-in 0.5s linear forwards",
        "marquee": "marquee var(--marquee-duration) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "flashing": "flashing 1.4s infinite linear",
        "marquee-x": "marquee-x 30s linear infinite",
        "marquee-xs": "marquee-x 20s linear infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '2px 2px 4px rgba(0, 128, 0, 0.4)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 6px rgba(0, 128, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '5px 5px 10px rgba(0, 128, 0, 0.5)',
        },
        '.text-shadow-xl': {
          textShadow: '7px 7px 14px rgba(0, 0, 0, 0.7)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
} satisfies Config

export default config