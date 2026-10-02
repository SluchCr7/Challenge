/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080C14",
        foreground: "#F8FAFC",
        primary: {
          DEFAULT: "#00E599",
          hover: "#10B981",
          dark: "#059669",
          light: "#34D399",
          glow: "rgba(0, 229, 153, 0.25)",
        },
        surface: {
          DEFAULT: "#0F172A",
          subtle: "#111C2E",
          card: "#0D1524",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "#162238",
        },
        carbon: {
          light: "#1E293B",
          DEFAULT: "#0F172A",
          dark: "#090E1A",
        },
        glass: {
          white: "rgba(255, 255, 255, 0.03)",
          dark: "rgba(11, 17, 29, 0.9)",
        }
      },
      borderRadius: {
        '4xl': '1.75rem',
        '5xl': '2rem',
        '6xl': '2.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};

