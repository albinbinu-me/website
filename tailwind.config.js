/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy tokens — kept for backward compat */
        ivory: '#FAF8F4',
        'warm-white': '#FFFFFF',
        'matte-black': '#1A1A1A',
        'champagne-gold': '#C9A96E',
        'stone-gray': '#8C8C8C',

        /* New design system tokens */
        'site-bg': '#FAFAFA',
        'site-section': '#F5F5F7',
        'site-text': '#1D1D1F',
        'site-secondary': '#6E6E73',
        'soft-gold': '#C6A87D',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '"DM Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      transitionTimingFunction: {
        'ease-custom': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'ease-apple': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },
      boxShadow: {
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.12)',
        'gold-glow': '0 0 40px rgba(198,168,125,0.18)',
        'soft': '0 4px 30px rgba(0,0,0,0.06)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
}
