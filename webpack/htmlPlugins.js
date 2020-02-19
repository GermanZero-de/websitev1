const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getFilesFromDir = require('./getFilesFromDir');

const PAGE_DIR = path.resolve(__dirname, '../src/pages');

const htmlPlugins = getFilesFromDir(PAGE_DIR, ['.pug']).map((filePath) => {
  const fileName = filePath.replace(PAGE_DIR, '');
  const pageTitle = fileName.replace(/\.pug$/, '').replace(/^\\/, '').replace(/^\//, '');
  return new HtmlWebpackPlugin({
    // chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'],
    template: filePath,
    inject: 'body',
    title: pageTitle === 'index' ? 'German Zero' : pageTitle,
    filename: `.${fileName.replace(/\.pug$/, '.html')}`,
  });
});

module.exports = htmlPlugins;
