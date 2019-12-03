/* eslint-disable global-require */

module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-custom-properties'),
    require('postcss-extend'),
    require('postcss-hexrgba'),
    require('postcss-rem'),
    require('postcss-each-variables'),
    require('postcss-mixins'),
    require('postcss-responsive-type'),
    require('postcss-nested'),
    require('rfs')({
      baseValue: 8,
      breakpoint: 1440,
      // factor: 5,
      remValue: 16,
      class: 'disable',
      // unitPrecision: 6,
      safariIframeResizeBugFix: false,
    }),
    require('autoprefixer'),
    require('css-mqpacker')({
      sort: true,
    }),
    process.env.NODE_ENV === 'production' ? require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }) : undefined,
  ],
  preset: {
    autoprefixer: {
      grid: true,
    },
  },
};
