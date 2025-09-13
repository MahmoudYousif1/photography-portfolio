/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'baskerville': ['BaskervvilleSC', 'serif'],
        'martian': ['Martian Mono', 'monospace'],
      },
      fontWeight: {
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      }
    },
  },
  plugins: [],
}
