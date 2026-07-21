export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
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
      animation: {
        'ring-slow': 'ring-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'ring-slow': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '80%': { opacity: '0.15' },
          '100%': { transform: 'scale(1.7)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
