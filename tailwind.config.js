/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "*.{js,ts,jsx,tsx,mdx}",
      "app/**/*.{ts,tsx}",
      "components/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "#f9fafb",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "#4cd7f6",
            foreground: "hsl(var(--primary-foreground))",
          },
          secondary: {
            DEFAULT: "#f9fafb",
            foreground: "hsl(var(--secondary-foreground))",
          },
        third :{
          DEFAULT: "#FE8360",
          foreground: "hsl(var(--third-foreground))",
        } ,
        forth :{
          DEFAULT: "#2d254c",
          foreground: "hsl(var(--forth-foreground))",
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
        
          "primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
      },
    },
    plugins: [require("tailwindcss-animate")],
  }
  
  