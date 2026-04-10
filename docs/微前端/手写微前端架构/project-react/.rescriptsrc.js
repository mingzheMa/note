const { name } = require('./package');

module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`; 
    config.output.globalObject = 'window';

    return config;
  },

  devServer: (_) => {
    const config = _;

    config.headers = {
      'Access-Control-Allow-Origin': '*',
    };
    config.historyApiFallback = true;
    config.hot = false;
    // webpack-dev-server v4: watchContentBase 已移除，使用 static.watch 控制静态资源监听
    if (config.static && typeof config.static === 'object' && !Array.isArray(config.static)) {
      config.static = { ...config.static, watch: false };
    }
    config.liveReload = false;

    return config;
  },
};