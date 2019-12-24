module.exports = function (api) {
  api.cache(true);

  const presets = [[
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      debug: true,
      modules: false,
      corejs: '3',
    },
  ]];
  const plugins = ['syntax-dynamic-import'];

  return {
    presets,
    plugins,
  };
};
