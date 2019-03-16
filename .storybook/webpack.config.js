module.exports = ({config}) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve("awesome-typescript-loader")
  });

  config.resolve.extensions.push('.ts', '.tsx');

  // config.externals = {
  //   'jsdom': 'window',
  //   'cheerio': 'window',
  //   'react/lib/ExecutionEnvironment': true,
  //   'react/lib/ReactContext': 'window',
  //   'react/addons': true,
  // };

  return config;
};