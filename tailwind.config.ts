import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        primary: '#007AFF',
        secondary: '#5856D6',
        accent: '#FF2D55',
        background: {
          light: '#FFFFFF',
          dark: '#1C1C1E',
        },
        text: {
          light: '#000000',
          dark: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}

export default config 