const path = require('path');
const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');

const PAGE_DIR = path.resolve(__dirname, '../src/pages');
const getFilesFromDir = require('./getFilesFromDir');

const htmlCriticalCssPlugins = getFilesFromDir(PAGE_DIR, ['.pug']).map((filePath) => {
  const fileName = filePath.replace(PAGE_DIR, '');
  const pageTitle = fileName.replace(/\.pug$/, '').replace(/^\\/, '').replace(/^\//, '');
  return new HtmlCriticalWebpackPlugin({
    base: path.resolve(__dirname, '..', 'dist'),
    src: `${pageTitle}.html`,
    dest: `${pageTitle}.html`,
    inline: true,
    minify: true,
    /* breaks order of css if 'true' !!! */
    extract: false,
    width: 1920,
    height: 1280,
    penthouse: {
      blockJSRequests: false,
      forceInclude: [
        /\.modal/,
        /\.notifications/,
        /\.menu-screen/,
        /\.header-nav/,
      ],
    },
  });
});

module.exports = htmlCriticalCssPlugins;
