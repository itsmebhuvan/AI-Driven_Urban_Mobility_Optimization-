/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        border: "var(--color-border)", /* Subtle white border */
        input: "var(--color-input)", /* Elevated dark surface */
        ring: "var(--color-ring)", /* Electric cyan */
        background: "var(--color-background)", /* Deep navy */
        foreground: "var(--color-foreground)", /* Pure white */
        primary: {
          DEFAULT: "var(--color-primary)", /* Electric cyan */
          foreground: "var(--color-primary-foreground)", /* Deep navy */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* Professional blue */
          foreground: "var(--color-secondary-foreground)", /* Pure white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* Critical red */
          foreground: "var(--color-destructive-foreground)", /* Pure white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* Darker muted surface */
          foreground: "var(--color-muted-foreground)", /* Muted blue-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* Strategic orange */
          foreground: "var(--color-accent-foreground)", /* Pure white */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* Elevated dark surface */
          foreground: "var(--color-popover-foreground)", /* Pure white */
        },
        card: {
          DEFAULT: "var(--color-card)", /* Elevated dark surface */
          foreground: "var(--color-card-foreground)", /* Pure white */
        },
        success: {
          DEFAULT: "var(--color-success)", /* Vibrant green */
          foreground: "var(--color-success-foreground)", /* Pure white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* Amber */
          foreground: "var(--color-warning-foreground)", /* Deep navy */
        },
        error: {
          DEFAULT: "var(--color-error)", /* Critical red */
          foreground: "var(--color-error-foreground)", /* Pure white */
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        caption: ["var(--font-caption)"],
        data: ["var(--font-data)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0, 212, 255, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.6)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 200ms ease-out",
        "slide-in": "slide-in 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      zIndex: {
        '100': '100',
        '200': '200',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}