const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getFilesFromDir = require('./getFilesFromDir');
const routes = require('../src/routes/routes');

const allRoutes = [...routes];
routes.forEach((r) => {
  if (r.children && r.children.length) {
    r.children.forEach((cr) => {
      allRoutes.push(cr);
    });
  }
});

const PAGE_DIR = path.resolve(__dirname, '../src/pages');

const htmlPlugins = getFilesFromDir(PAGE_DIR, ['.pug']).map((filePath) => {
  const fileName = filePath.replace(PAGE_DIR, '');
  const routePath = fileName.replace(/\.pug$/, '').replace(/\//, '\\');
  const routeMatch = allRoutes.find((r) => r.href === routePath);
  let title = 'German Zero';
  let description = '';
  if (routeMatch && routeMatch.meta) {
    title = routeMatch.meta.title;
    description = routeMatch.meta.description;
  }
  return new HtmlWebpackPlugin({
    // chunks: [fileName.replace(path.extname(fileName), ''), 'vendor'],
    template: filePath,
    inject: 'body',
    title,
    meta: {
      description,
    },
    filename: `.${fileName.replace(/\.pug$/, '.html')}`,
  });
});

module.exports = htmlPlugins;
