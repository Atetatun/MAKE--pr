/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Palette (from design-system.md)
        navy: {
          DEFAULT: '#1e3a8a',
          dark: '#162e6e',
          light: '#2a4fa8',
        },
        cyan: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          light: '#38bdf8',
        },
        orange: {
          DEFAULT: '#f97316',
          dark: '#ea6c0a',
          light: '#fb923c',
        },
        // Semantic Colors
        'text-primary': '#0f172a',
        'text-muted': '#64748b',
        'bg-light': '#f8fafc',
        'border-color': '#e2e8f0',
        // Neutral Scale (Slate)
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Status Colors
        success: '#22c55e',
        warning: '#eab308',
        error: '#ef4444',
      },
      fontFamily: {
        heading: ['Inter', 'Helvetica Neue', 'Arial', 'system-ui', 'sans-serif'],
        body: ['Open Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        // Type Scale (from design-system.md)
        'page-title': ['54px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-header': ['28px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'subtitle': ['24px', { lineHeight: '1.3', letterSpacing: '0', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', letterSpacing: '0.03em', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.5', letterSpacing: '0.04em', fontWeight: '400' }],
      },
      spacing: {
        // 8px grid system
        '0.5u': '4px',
        '1u': '8px',
        '1.5u': '12px',
        '2u': '16px',
        '3u': '24px',
        '4u': '32px',
        '6u': '48px',
        '8u': '64px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'large': '0 10px 25px rgba(0, 0, 0, 0.15)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        'quick': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      maxWidth: {
        'page': '1200px',
        'builder': '1400px',
        'content': '800px',
        'modal': '500px',
        'modal-lg': '700px',
        'toast': '320px',
      },
      screens: {
        // Responsive Breakpoints (from design-system.md)
        'mobile': '320px',
        'sm': '640px',
        'md': '768px',
        'tablet': '640px',
        'desktop': '1024px',
        'lg': '1024px',
        'xl': '1280px',
        'wide': '1440px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
