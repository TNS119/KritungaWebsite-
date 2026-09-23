/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        palegar: {
          bg: '#0A0203',
          card: '#140507',
          cardHover: '#1D080B',
          crimson: '#8C1824',
          chilli: '#D6301D',
          gold: '#E5A93C',
          goldLight: '#F3C973',
          copper: '#C87D32',
          brass: '#E6C280',
          text: '#FFF8EE',
          muted: 'rgba(255, 248, 238, 0.65)',
          // Royal Light Mode (Imperial Ivory & Saffron Palace)
          lightBg: '#FDF8F2',
          lightCard: '#FFFFFF',
          lightCardHover: '#F7EFE6',
          lightText: '#1C0D0F',
          lightMuted: '#634B4E',
          lightGold: '#B87B18',
          lightGoldLight: '#D49B28',
          lightCrimson: '#9E1B28',
          lightChilli: '#C92A1A',
          lightBorder: 'rgba(184, 123, 24, 0.25)',
        },
      },
      backgroundImage: {
        'royal-gradient': 'radial-gradient(circle at 50% 30%, rgba(140, 24, 36, 0.25) 0%, rgba(10, 2, 3, 0.95) 75%)',
        'gold-shimmer': 'linear-gradient(135deg, #F3C973 0%, #E5A93C 50%, #C87D32 100%)',
        'crimson-flame': 'linear-gradient(135deg, #FF453A 0%, #D6301D 50%, #8C1824 100%)',
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
};
