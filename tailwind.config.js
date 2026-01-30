/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clobster: {
          coral: '#E8734A',
          'coral-dark': '#C95A35',
          'coral-light': '#F4967A',
          sky: '#E8F4F8',
          'sky-dark': '#C5E0E8',
          dark: '#1a1a2e',
          darker: '#0f0f1a',
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'pixel': '4px 4px 0 #1a1a2e',
        'pixel-lg': '8px 8px 0 #C95A35, 4px 4px 0 #1a1a2e',
        'pixel-sm': '2px 2px 0 #1a1a2e',
      }
    },
  },
  plugins: [],
}
