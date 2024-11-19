/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'secondary': 'var(--color-secondary)',
        'accent': 'var(--color-accent)',
        'text': 'var(--color-text)',
        'text-secondary': 'var(--color-text-secondary)',
        'background': 'var(--color-background)',
        'surface': 'var(--color-surface)',
        'border': 'var(--color-border)',
      },
      fontFamily: {
        sans: [
          'Noto Sans JP',
          'Helvetica Neue',
          'Arial',
          'Hiragino Kaku Gothic ProN',
          'Hiragino Sans',
          'Meiryo',
          'sans-serif'
        ],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-ring': {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.5' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
      },
      opacity: {
        '5': '0.05',
        '80': '0.8',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    function({ addUtilities, theme }) {
      const colors = theme('colors');
      const utilities = {};
      
      Object.entries(colors).forEach(([color, value]) => {
        if (typeof value === 'string') {
          utilities[`.bg-${color}-5`] = {
            'background-color': `${value}0d`,
          };
          utilities[`.border-${color}-80`] = {
            'border-color': `${value}cc`,
          };
        }
      });
      
      addUtilities(utilities);
    },
  ],
};