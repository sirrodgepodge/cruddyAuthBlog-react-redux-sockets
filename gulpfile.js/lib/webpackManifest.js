const path = require('path'),
      fs   = require('fs');

module.exports = function webpackManifest(publicPath, dest, filename) {
  filename = filename || 'rev-manifest.json';

  return function createPlugin() {
    this.plugin("done", stats => {
      stats = stats.toJson();

      const chunks = stats.assetsByChunkName,
            manifest = {};

      for (const key of chunks) {
        manifest[`${publicPath}${key}.js`] = path.join(publicPath, chunks[key]);
      }

      fs.writeFileSync(
        path.join(process.cwd(), dest, filename),
        JSON.stringify(manifest)
      );
    });
  };
};
