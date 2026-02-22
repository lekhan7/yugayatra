/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-main': '#FFFFFF',
        'text-main': '#1F2937',
        'accent-main': '#059669', // Dark Mint for headings
        'accent-dark': '#047857', // Very Dark Mint
        'accent-gold': '#6EE7B7', // Light Mint for other elements
        'accent-light': '#A7F3D0', // Very Light Mint
        'text-light': '#374151',
        'border-light': '#E5E7EB',
        'card-bg': '#FFFFFF',
        // Legacy colors for transition
        primary: '#FFFFFF',
        accent: '#059669',
        secondary: '#6EE7B7',
        dark: '#1F2937',
        mint: '#059669',
        'soft-gray': '#F9FAFB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3s steps(40) infinite',
        'counter': 'counter 2s ease-out',
        'card-tilt': 'card-tilt 0.3s ease-out',
        'text-reveal': 'text-reveal 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(217, 104, 214, 0)' },
          '100%': { boxShadow: '0 0 40px rgba(217, 104, 214, 0.3)' },
        },
        typing: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        counter: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1)' },
        },
        'card-tilt': {
          '0%': { transform: 'perspective(1000px) rotateY(0deg)' },
          '100%': { transform: 'perspective(1000px) rotateY(5deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
