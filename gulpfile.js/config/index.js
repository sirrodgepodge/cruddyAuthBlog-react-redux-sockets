const path = require('path'),
      serverPort = process.env.PORT || 3000,
      webPackPort = serverPort - 1,
      buildConfig = {
  serverPort,
  webPackPort,
  rootDirectory:   path.resolve('./'),
  publicDirectory: path.resolve('./public'),
  clientDirectory: path.resolve('./client'),
  serverDirectory: path.resolve('./server'),
  sharedDirectory: path.resolve('./shared'),
  assetsDirectory: path.resolve('./static'),
  publicAssetsDirectory: path.resolve('./public/assets')
};

module.exports = buildConfig;
