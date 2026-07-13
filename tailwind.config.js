export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 25px 80px rgba(0, 0, 0, 0.25)',
      },
      colors: {
        brand: {
          light: '#ff84aa',
          DEFAULT: '#ff4f8b',
          dark: '#c30f6d',
        },
      },
    },
  },
  plugins: [],
};
