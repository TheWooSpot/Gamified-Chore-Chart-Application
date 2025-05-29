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
          DEFAULT: '#FF7D00', // warm orange
          dark: '#E56E00',
          light: '#FF9933',
        },
        secondary: {
          DEFAULT: '#8C52FF', // purple
          dark: '#7A3FE0',
          light: '#A375FF',
        },
        background: {
          DEFAULT: '#2D2D2D', // dark gray
          dark: '#1A1A1A',
          light: '#3D3D3D',
        },
        accent: {
          DEFAULT: '#FFD166', // warm yellow
          dark: '#E5B84C',
          light: '#FFDC85',
        },
        success: '#06D6A0',
        warning: '#FFD166',
        error: '#EF476F',
        text: {
          DEFAULT: '#F5F5F5',
          muted: '#B8B8B8',
        }
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.25)',
        'glow': '0 0 15px rgba(255, 125, 0, 0.5)',
        'glow-purple': '0 0 15px rgba(140, 82, 255, 0.5)',
      }
    },
  },
  plugins: [],
}
