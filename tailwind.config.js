/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00B4D8',
          dark: '#0096C7',
          light: '#48CAE4',
        },
        secondary: {
          DEFAULT: '#F72585',
          dark: '#D11F6F',
          light: '#FF4D9F',
        },
        tertiary: {
          DEFAULT: '#7209B7',
          dark: '#5A078A',
          light: '#9D4EDD',
        },
        accent: {
          DEFAULT: '#FFB703',
          dark: '#FB8500',
          light: '#FFC733',
        },
        success: {
          DEFAULT: '#06D6A0',
          dark: '#05B185',
          light: '#3BE0B7',
        },
        warning: {
          DEFAULT: '#FFB703',
          dark: '#FB8500',
          light: '#FFC733',
        },
        error: {
          DEFAULT: '#EF476F',
          dark: '#D63050',
          light: '#F26588',
        },
        impact: {
          education: '#00B4D8',
          health: '#F72585',
          water: '#4CC9F0',
          housing: '#FFB703',
          energy: '#FFC733',
          food: '#06D6A0',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          light: 'var(--color-text-light)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          light: 'var(--color-border-light)',
        },
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.125rem', { lineHeight: '1.5' }],
        'xl': ['1.25rem', { lineHeight: '1.4' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'card-hover-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'glow-blue': '0 0 30px rgba(0, 180, 216, 0.4)',
        'glow-pink': '0 0 30px rgba(247, 37, 133, 0.4)',
        'glow-yellow': '0 0 30px rgba(255, 183, 3, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'slide-in': 'slideIn 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
