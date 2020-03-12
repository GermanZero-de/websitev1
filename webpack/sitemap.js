const { SitemapPlugin } = require('@jahed/webpack-sitemap');
const allRoutes = require('../src/routes/routes');

const links = allRoutes.map((route) => route.href).filter((link) => !/^(http|https):\/\//.test(link));

function prepareUrlSet(items) {
  const urlset = {};

  items.forEach((link) => {
    urlset[link] = { priority: 0.5 };
  });
  urlset['/'] = { priority: 0.9 };
  urlset['/klimaplan'] = { priority: 0.8 };
  return urlset;
}

const urlset = prepareUrlSet(links);

module.exports = new SitemapPlugin({
  basename: 'https://germanzero.de',
  sitemapindex: {
    app: {
      urlset,
    },
  },
  defaults: {
    sitemap: {
      lastmod: new Date().toISOString(),
    },
    url: {
      lastmod: new Date().toISOString(),
      priority: 0.5,
      changefreq: 'daily',
    },
  },
});
