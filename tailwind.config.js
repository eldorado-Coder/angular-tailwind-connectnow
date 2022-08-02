/* refer for more details https://tailwindcss.com/docs/configuration */

module.exports = {
  purge: [
    './src/**/*.{html,js}',
    './src/app/**/*.{html,js}',
    './src/index.html'
  ],
  darkMode: false,
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }
      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }
      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      primary: ['Mulish'],
      secondary: ['Montserrat'],
    },
    borderRadius: {
      none: '0',
      tiny: '5px',
      sm: '8px',
      DEFAULT: '12px',
      md: '14px',
      lg: '24px',
      full: '9999px',
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    fontSize: {
      tiny: '8px',
      xs: '12px',
      sm: '14px',
      base: '15px',
      lg: '25px',
      xl: '35px',
      '2xl': '45px',
      '3xl': '75px',
    },
    colors: {
      transparent: 'transparent',
      text: {
        default: '#c1d1e8',
        title: '#ffffff'
      },
      background: {
        // body: 'linear-gradient(to bottom top, blue, red)',
        body: '#051221',
        card: '#0e1a2b',
        input: '#182c47',
        black: '#000000'
      },
      button: {
        default: '#5692e8'
      },
    },
    extend: {
      width: {
        '1/10': '10%',
        '1.5/10': '15%',
        '3/10': '30%',
        '3.5/10': '35%',
        '4.5/10': '45%',
        '5.5/10': '55%',
        '6.5/10': '65%',
        '7/10': '70%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
      },
      height: {
        '1/10': '10%',
        '1.5/10': '15%',
        '3/10': '30%',
        '3.5/10': '35%',
        '4.5/10': '45%',
        '5.5/10': '55%',
        '6.5/10': '65%',
        '7/10': '70%',
        '8.5/10': '85%',
        '9/10': '90%',
        '9.5/10': '95%',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    outline: false,
  },
};