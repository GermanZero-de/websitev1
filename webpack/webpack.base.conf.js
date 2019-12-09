const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules|bower_components/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        enforce: 'pre',
        test: /(\.m?js) | (\.vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
      },
      {
        test: /\.m?js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }, {
        test: /\.pcss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          }, {
            loader: 'postcss-loader',
            options: {sourceMap: true, config: {path: './postcss.config.js'}},
          },
        ],
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true},
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                // eslint-disable-next-line global-require
                require('autoprefixer'),
              ],
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/img/svg-sprite'),
        use: [
          {loader: 'svg-sprite-loader', options: {}},
          'svg-transform-loader',
          'svgo-loader',
        ],
      }],
  },
  resolve: {
    alias: {
      '@': PATHS.src,
      '~': PATHS.src,
    },
  },
  plugins: [

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/${PATHS.assets}`, to: `${PATHS.assets}`},
      {from: `${PATHS.src}/static`, to: ''},
    ]),

    new SpriteLoaderPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/index.pug'),
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/klimaplan.pug'),
      filename: './klimaplan.html',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/pages/presse.pug'),
      filename: './presse.html',
    }),
  ],
};
