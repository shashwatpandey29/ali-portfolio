/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#030712',
        surface: {
          1: '#0f1629',
          2: '#1a2035',
          3: '#252d44',
        },
        accent: {
          electric: '#6366f1',
          glow: '#a78bfa',
          lime: '#84cc16',
          ember: '#f97316',
        },
        glass: {
          border: 'rgba(255,255,255,0.08)',
          bg: 'rgba(255,255,255,0.04)',
          hover: 'rgba(255,255,255,0.07)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['DM Mono', 'JetBrains Mono', 'monospace'],
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'gradient-y': 'gradient-y 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'ticker': 'ticker 36s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        ticker: {
          to: { transform: 'translateX(-25%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        '300%': '300%',
      },
    },
  },
  plugins: [],
}
