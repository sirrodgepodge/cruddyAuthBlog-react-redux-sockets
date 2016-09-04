const buildConfig = require('../');

module.exports = {
  watch: `${buildConfig.assetsDirectory}/fonts/**/*`,
  src: `${buildConfig.assetsDirectory}/fonts/**/*`,
  dest: `${buildConfig.publicAssetsDirectory}/fonts`
};
