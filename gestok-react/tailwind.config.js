/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#e0f1fe',
          500: '#2f6f9f',
          600: '#254e6f',
          700: '#1e3e5a',
        },
        accent: {
          DEFAULT: '#2f6f9f',
          strong: '#254e6f',
        },
        danger: '#ef4444',
        muted: '#6b7280',
      },
      borderRadius: {
        'xl': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}