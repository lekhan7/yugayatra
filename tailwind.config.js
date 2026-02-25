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
<<<<<<< HEAD
        // Light mode colors - Peach Glow Palette
        'bg-main': '#FDF0E6', // Light peach/cream main background
        'text-main': '#2D1810', // Dark brown for high contrast
        'accent-main': '#E8834A', // Peach orange for headings
        'accent-dark': '#D84315', // Dark peach for active states
        'accent-gold': '#FFAB80', // Light peach for highlights
        'accent-light': '#FFE0B2', // Very light peach
        'mint-clarity': '#FFAB80', // Peach clarity (replacing mint)
        'text-light': '#5D4037', // Medium brown for secondary text
        'text-muted': '#8D6E63', // Light brown for muted text
        'border-light': '#F5DEB3', // Light peach border
        'card-bg': '#FFFFFF', // White for cards
        'surface-variant': '#FFF3E0', // Very light peach alternative
        'bg-alt': '#FAF0E6', // Slightly darker peach alt background
=======
        // Light mode colors (unchanged)
        'bg-main': '#FFFFFF',
        'text-main': '#1F2937',
        'accent-main': '#B0E0E6', // Light Sky Blue for headings
        'accent-dark': '#047857', // Very Dark Mint
        'accent-gold': '#6EE7B7', // Light Mint for other elements
        'accent-light': '#A7F3D0', // Very Light Mint
        'mint-clarity': '#87CEEB', // Sky Blue
        'text-light': '#374151',
        'border-light': '#E5E7EB',
        'card-bg': '#FFFFFF',
>>>>>>> b9705d0ecfd05f30733e117f5385c34df395c8ec
        // Legacy colors for transition
        primary: '#FFFFFF',
        accent: '#E8834A',
        secondary: '#FFAB80',
        dark: '#2D1810',
        mint: '#E8834A',
        'soft-gray': '#FDF0E6',
        
        // Dark mode colors - Peach Glow Dark Mode
        'dark-bg': '#1A0E08', // Very dark brown
        'dark-surface': '#2D1810', // Dark brown
        'dark-card': '#3E2723', // Medium dark brown
        'dark-text-primary': '#FFFFFF', // White text
        'dark-text-secondary': '#FFAB80', // Light peach for secondary text
        'dark-text-muted': '#8D6E63', // Light brown for muted text
        'dark-blue-primary': '#FFAB80', // Light peach accent (replacing blue)
        'dark-blue-secondary': '#FFB74D', // Medium peach
        'dark-blue-accent': '#E8834A', // Peach orange accent
        'dark-blue-light': '#FFE0B2', // Very light peach
        'dark-blue-muted': '#FFCC80', // Light peach muted
        'dark-border': '#5D4037', // Medium brown border
        'dark-hover': '#D84315', // Dark peach hover
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
