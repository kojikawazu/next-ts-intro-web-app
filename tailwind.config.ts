import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xxs:   '250px',
        xs:    '300px',
        ssssm: '350px',
        sssm:  '414px',
        ssm:   '500px',
      },
      colors: {
        'lblue':  'rgba(157, 237, 255, 0.70)',
        'dblue':  'rgba(0, 121, 148, 1)',
        'hero':   'rgba(173, 216, 230, 0.51)',
        'career': '#84C1CE',
        'skills': '#D3D3D3',
        'footer': '#007994'
      },
      fontSize: {
        xxxxs: [ '0.05rem', {
          lineHeight: '0.60rem'
        }],
        xxxs: [ '0.25rem', {
          lineHeight: '0.65rem'
        }],
        xxs: [ '0.50rem', {
          lineHeight: '0.75rem'
        }],
      }
    },
  },
  plugins: [],
}
export default config
