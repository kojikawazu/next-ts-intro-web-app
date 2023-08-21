import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lblue': 'rgba(157, 237, 255, 0.70)',
        'dblue': 'rgba(0, 121, 148, 1)',
        'hero':  'rgba(173, 216, 230, 0.51)',
        'career': '#84C1CE',
        'skills': '#D3D3D3',
        'footer': '#007994'
      },
      screens: {
        xs: '300px',
      },
    },
  },
  plugins: [],
}
export default config
