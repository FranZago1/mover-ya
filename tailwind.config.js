/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "ui-sans-serif", "Segoe UI", "Roboto", "Helvetica", "Arial"],
      },
      colors: {
        brand: {
          DEFAULT: "#0A2A6B", // Cobalto
          600: "#0E317A",
          700: "#0A2A6B",
          900: "#071D4D",
        },
        accent: {
          DEFAULT: "#A8E600", // Lima
          100: "#F2FFD1",
          200: "#E7FFAD",
          600: "#89C800",
          700: "#6DA300",
        },
        ink: {
          DEFAULT: "#1A2B3B",
          soft: "#6B7280",
        },
      },
      boxShadow: {
        soft: "0 8px 28px rgba(10,42,107,0.10)",
        card: "0 6px 18px rgba(10,42,107,0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
