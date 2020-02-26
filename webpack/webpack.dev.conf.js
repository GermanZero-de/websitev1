const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const htmlPlugins = require('./htmlPlugins');

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 3000,
    /* enable gzip */
    compress: false,
    // hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(false),
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    ...htmlPlugins,
  ],
});

module.exports = new Promise((resolve) => {
  resolve(devWebpackConfig);
});
