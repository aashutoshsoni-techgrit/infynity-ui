import type { Config } from 'tailwindcss';

const config: Config = {
   content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      extend: {
         fontSize: {
            h1: ['3rem', '3.875rem'],
            h2: ['2.5rem', '3.25rem'],
            h3: ['2rem', '2.563rem'],
            h4: ['1.75rem', '2.25rem'],
            h5: ['1.26rem', '2rem'],
            h6: ['1.1rem', '1.5rem'],
            subheading: ['1.563rem', '2rem'],
            'subheading-sm': ['1.5rem', '1.875rem'],
            'subheading-xs': ['1.313rem', '1.688rem'],
            title: ['1.125rem', '1.563rem'],
            body: ['1rem', '1.438rem'],
            'body-md': ['0.875rem', '1.313rem'],
            'body-sm': ['0.75rem', '1.125rem'],
            caption: ['0.625rem', '0.875rem'],
            button: ['0.875rem', '1.5rem']
         },
         colors: {
            'dodger-blue': {
               DEFAULT: '#1E90FF'
            },
            'shade-blue': {
               DEFAULT: '#4361EE'
            },
            'midnight-blue': {
               DEFAULT: '#191970'
            },
            'midnight-dark-blue': {
               DEFAULT: '#03045E'
            },
            'light-blue': {
               DEFAULT: '#E8F4FF'
            },
            'dark-gray': {
               DEFAULT: '#595959'
            },
            white: {
               DEFAULT: '#FFFFFF'
            },
            info: {
               DEFAULT: '#48CAE4'
            },
            success: {
               DEFAULT: '#24B765'
            },
            warning: {
               DEFAULT: '#E76F51'
            },
            error: {
               DEFAULT: '#EF233C'
            },
            yellow: {
               DEFAULT: '#FFD60A'
            },
            violet: {
               DEFAULT: '#7209B7'
            },
            turquoise: {
               DEFAULT: '#48CAE4'
            },
            black: {
               DEFAULT: '#1E1E1E'
            },
            'black-light': {
               DEFAULT: '#3B3B3B'
            },
            'black-x-light': {
               DEFAULT: '#595959'
            },
            grey: {
               DEFAULT: '#767676'
            },
            'grey-light': {
               DEFAULT: '#949494'
            },
            'grey-x-light': {
               DEFAULT: '#A9A9A9'
            },
            'grey-2x-light': {
               DEFAULT: '#BFBFBF'
            },
            'grey-3x-light': {
               DEFAULT: '#D4D4D4'
            },
            'grey-4x-light': {
               DEFAULT: '#EAEAEA'
            },
            'grey-5x-light': {
               DEFAULT: '#efefef'
            },
            'grey-6x-light': {
               DEFAULT: '#F6F7FE'
            }
         }
      }
   },
   plugins: []
};
export default config;
