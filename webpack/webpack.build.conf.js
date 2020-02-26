const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const htmlPlugins = require('./htmlPlugins');
const criticalCssPlugins = require('./criticalCssPlugins');

let plugins = [];

if (process.env.CRITICAL_CSS) {
  plugins = plugins.concat(criticalCssPlugins);
} else {
  plugins = plugins.concat(htmlPlugins);
}

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          safari10: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      IS_PRODUCTION: JSON.stringify(true),
    }),
    ...plugins,
  ],
});


if (process.env.ANALYZE) {
  // eslint-disable-next-line global-require
  const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
  buildWebpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    openAnalyzer: true,
  }));
}

module.exports = new Promise((resolve) => {
  resolve(buildWebpackConfig);
});
