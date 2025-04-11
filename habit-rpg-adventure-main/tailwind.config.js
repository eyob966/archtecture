/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'solo-darker': '#0f1421',
        'solo-dark': '#151b2b',
        'solo-blue': '#2e6bff',
        'solo-blue-light': '#5a8eff',
        'solo-gray': '#2a3146',
        'solo-gray-light': '#3a4258',
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "status-ping": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.3 },
          "50%": { transform: "scale(1.3)", opacity: 0 },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "brightness(1)" },
          "50%": { filter: "brightness(1.2)" },
        },
        "shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "page-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "progress-fill": "progress-fill 2s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "status-ping": "status-ping 1.5s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "shine": "shine 3s linear infinite",
        "page-in": "page-in 0.3s ease-out",
      },
      boxShadow: {
        'blue-glow': '0 0 25px rgba(46, 107, 255, 0.6)',
        'blue-glow-intense': '0 0 35px rgba(46, 107, 255, 0.8)',
        'glow-md': '0 0 15px rgba(46, 107, 255, 0.5)',
        'glow-lg': '0 0 25px rgba(46, 107, 255, 0.6)',
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(to right, #2e6bff, #5a8eff)',
        'border-gradient': 'linear-gradient(to right, rgba(46, 107, 255, 0), rgba(46, 107, 255, 0.8), rgba(46, 107, 255, 0))',
      },
    },
  },
  plugins: [tailwindcssAnimate],
}
