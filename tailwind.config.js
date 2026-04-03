/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#0a0a0f',
        surface: '#111118',
        card:    '#16161f',
        border:  '#1e1e2e',
        orange:  '#f97316',
        cyan:    '#06b6d4',
        amber:   '#fbbf24',
        muted:   '#6b7280',
        light:   '#e5e7eb',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
