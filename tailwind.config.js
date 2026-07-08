/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ocean:   '#2288C9',
        'ocean-light': '#EBF5FB',
        'ocean-dark':  '#1A6FA0',
        sand:    '#F8F4EC',
        'sand-dark': '#EDE8DC',
        charcoal: '#1C1C1E',
        'gray-soft': '#8E8E93',
        'gray-line': '#E5E5EA',
        hibiscus: '#D94F6B',
        plumeria: '#F5A623',
        verified: '#34C759',
      },
    },
  },
  plugins: [],
};
