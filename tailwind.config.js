/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-floresta': '#1F4D3A',
        'verde-escuro': '#163629',
        'dourado': '#C8A34D',
        'dourado-escuro': '#A8832D',
        'grafite': '#3C3C3C',
        'cinza-claro': '#E7E7E7',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
