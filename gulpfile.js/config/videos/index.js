const buildConfig = require('../');

module.exports = {
  watch: `${buildConfig.assetsDirectory}/videos/**/*`,
  src: `${buildConfig.assetsDirectory}/videos/**/*`,
  dest: `${buildConfig.publicAssetsDirectory}/videos/`
};
