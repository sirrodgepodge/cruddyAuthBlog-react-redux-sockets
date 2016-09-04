const buildConfig = require('../');

module.exports = {
  watch: `${buildConfig.assetsDirectory}/images/**/*`,
  src: `${buildConfig.assetsDirectory}/images/**/*`,
  dest: `${buildConfig.publicAssetsDirectory}/images/`
};
