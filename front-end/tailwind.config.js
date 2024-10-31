/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-gray-1': '#555555',
        'custom-gray-2': '#8D8D8E',
        'verde-custom': '#9DC73B',
        'azul-custom': '#2596be',
        province: '#1D4ED8',
        locality: '#D97706',
        school: '#047857',
        sportsEntity: '#DC2626',
        sport: '#3B82F6',
        scholarship: '#9333EA',
      },
    },
  },
  plugins: [],
}
