import type { Config } from 'tailwindcss'

/**
 * Colores alineados con :root en app/globals.css (--orange, --cyan, etc.)
 * para que utilidades como bg-card, text-orange y border-border usen las mismas variables.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        card: 'var(--card)',
        border: 'var(--border)',
        orange: 'var(--orange)',
        cyan: 'var(--cyan)',
        amber: 'var(--amber)',
        muted: '#6b7280',
        light: '#e5e7eb',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        body: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
