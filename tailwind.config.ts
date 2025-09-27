import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf7f0',
          100: '#f9e6d3',
          200: '#f2cba3',
          300: '#e8a86f',
          400: '#dd7f3f',
          500: '#d4621a',
          600: '#c64d10',
          700: '#a53c0f',
          800: '#843114',
          900: '#6b2a13',
        },
      },
    },
  },
  plugins: [],
}
export default config
