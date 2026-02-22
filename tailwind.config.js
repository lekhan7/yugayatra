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
        // Mint Clarity Theme
        'bg-main': '#F2FDF9',
        'text-main': '#0D3D2B',
        'text-darker': '#0A1F1A',
        'text-darkest': '#051510',
        'accent-main': '#2ECC9A',
        'text-light': '#7DE0C0',
        'border-light': '#C8F5E8',
        'card-bg': '#FFFFFF',
        // Mint Clarity Swatches
        'mint-50': '#F2FDF9',
        'mint-100': '#C8F5E8',
        'mint-200': '#7DE0C0',
        'mint-300': '#2ECC9A',
        'mint-900': '#0D3D2B',
        // Dark mode variants
        'dark-bg': '#0A1F1A',
        'dark-text': '#F2FDF9',
        'dark-accent': '#7DE0C0',
        'dark-card': '#0D3D2B',
        // Legacy colors for transition
        primary: '#F2FDF9',
        accent: '#2ECC9A',
        secondary: '#7DE0C0',
        dark: '#0D3D2B',
        'soft-gray': '#F2FDF9',
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
