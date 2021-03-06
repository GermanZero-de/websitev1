const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const dotenv = require('dotenv').config({
  path: path.resolve('.env'),
});

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/',
};

const imagesLoaders = [
  {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
    },
  },
  {
    loader: 'image-webpack-loader',
    options: {
      mozjpeg: {
        progressive: true,
        quality: 65,
      },
      // optipng.enabled: false will disable optipng
      optipng: {
        enabled: false,
      },
      pngquant: {
        quality: [0.65, 0.90],
        speed: 4,
      },
      gifsicle: {
        interlaced: false,
      },
      // the webp option will enable WEBP
      webp: {
        quality: 75,
      },
    },
  },
];

module.exports = {
  // BASE config
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        loader: 'ejs-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          basedir: path.resolve(__dirname, '../src'),
        },
      },
      {
        enforce: 'pre',
        test: /(\.m?js) | (\.vue)$/,
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
      },
      {
        test: /\.m?js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        include: [
          path.resolve(PATHS.src),
          /* swiper needs to be polyfilled */
          path.resolve('node_modules/dom7'),
          path.resolve('node_modules/ssr-window'),
          path.resolve('node_modules/swiper'),
        ],
      }, {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png)$/i,
        oneOf: [
          {
            resourceQuery: /resize/,
            use: {
              loader: 'responsive-loader',
              options: {
                placeholder: true,
                placeholderSize: 100,
                sizes: [480, 640, 768, 1024, 1280, 1920],
                quality: 80,
              },
            },
          },
          {
            use: imagesLoaders,
          },
        ],

      },
      {
        test: /\.(gif|svg|webp)$/,
        use: imagesLoaders,
      }, {
        test: /\.pcss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: process.env.NODE_ENV === 'development',
              esModule: true,
            },
          },
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
      /* {
        test: /\.svg$/,
        include: path.resolve(__dirname, '../src/assets/img/svg-sprite'),
        use: [
          { loader: 'svg-sprite-loader', options: {} },
          'svg-transform-loader',
          'svgo-loader',
        ],
      } */
    ],
  },
  resolve: {
    alias: {
      '@': PATHS.src,
      '~': PATHS.src,
    },
  },
  plugins: [
    ...(process.env.CRITICAL_CSS ? [] : [new CleanWebpackPlugin()]),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[contenthash].css`,
    }),
    new CopyWebpackPlugin([
      {from: `${PATHS.src}/${PATHS.assets}`, to: `${PATHS.assets}`},
      {from: `${PATHS.src}/static`, to: ''},
    ]),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
      IS_PRODUCTION: JSON.stringify(false),
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      env: JSON.stringify(dotenv.parsed),
    }),
    new SpriteLoaderPlugin(),
    new webpack.ProgressPlugin(),
  ],
};
