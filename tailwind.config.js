const gutterSize = '0.625rem'; // 10px

module.exports = {
  important: true,
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1280px',
      },
      fontFamily: {
        display: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
        body: ['Work Sans', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
        main: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
        secondary: ['Work Sans', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
        tertiary: ['PT Serif', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', 'sans-serif'],
      },
      borderWidth: {
        default: '1px',
        0: '0',
        2: '2px',
        4: '3px',
      },
      borderColor: (theme) => ({
        default: theme('colors.body', 'currentColor'),
      }),
      colors: {
        white: '#ffffff',
        black: '#000000',
        body: 'var(--color-body)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        'body-invert': 'rgba(255,255,255,.6)',
        gray: '#d8d8d8',
        light: '#efefef',
        error: '#ff4e4e',
      },
      opacity: {
        40: '0.4',
        60: '0.6',
      },
      fontSize: {
        lg: '1.125rem', // 18px
        xl: '1.25rem', // 20px
        '2xl': '1.875rem', // 30px
        '3xl': '2.5rem', // 40px
        '4xl': '3.75rem', // 60px
      },
      boxShadow: {
        default: '0 2px 6px 0 rgba(0, 0, 0, 0.06)',
      },
      container: {
        center: true,
        screens: {},
        padding: '0.625rem',
      },
      spacing: {
        px: '1px',
        1: '0.3125rem', // 5px
        2: '0.625rem', // 10px
        3: '0.9375rem', // 15px,
        4: '1.25rem', // 20px
        5: '1.875rem', // 30px
        6: '2.5rem', // 40px
        7: '3.75rem', // 60px
        8: '5', // 80px
        9: '5.625rem', // 90px
        10: '7.5rem', // 120px
        12: '15rem', // 240px
      },
    },
  },
  plugins: [
    function ({addBase, config}) {
      addBase({});
    },
  ],
  variants: {
    width: ['responsive'],
  },
};
