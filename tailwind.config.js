/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
        averta: ['AvertaStd', ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          //* Background
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          //* Complement
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          //* Default
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          //* Hovered
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          //* Active
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        secondary: {
          50: '#EFF9F8',
          //* Background
          100: '#E8F4F3',
          200: '#E0F3F1',
          //* Complement
          300: '#D0EDEB',
          400: '#A2DBD7',
          //* Default
          500: '#40A69F',
          //* Hovered
          600: '#3B9993',
          //* Active
          700: '#2F7A75',
          800: '#235C58',
          900: '#173D3A',
        },
        rating: {
          DEFAULT: '#FF8700',
          light: '#FFC400',
          dark: '#E76F00',
        },
        typo: {
          DEFAULT: '#1F1F1F',
          secondary: '#707070',
          tertiary: '#999CA0',
          icons: '#999CA0',
          divider: '#EBEBEB',
          outline: '#D9D9D9',
        },
        dark: {
          //* Base dark color
          DEFAULT: '#242A32',
          //* Fields background
          field: '#3A3F47',
          //* Cards, elements background
          card: '#1E242A',
          //* Borders and outlines
          border: '#333A40',
          //* Text colors
          text: '#E0E0E0',
          textSecondary: '#A0A0A0',
          textTertiary: '#67686D',
          //* Complementary elements
          complement: '#2B3138',
          //* Dividers and separators
          divider: '#3A3F45',
        },
        light: {
          DEFAULT: '#F5F5F5',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
      height: {
        'screen/2': '50vh', // Half the screen height
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      const newUtilities = {
        '.no-scrollbar::-webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      };

      addUtilities(newUtilities);
    },
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-animate'),
  ],
};
