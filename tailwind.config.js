export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Noto Sans Arabic"', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          DEFAULT: '#4C51BF',
          dark: '#3C366B',
        },
        secondary: {
          DEFAULT: '#63B3ED',
        },
      },
    },
  },
  plugins: [],
};