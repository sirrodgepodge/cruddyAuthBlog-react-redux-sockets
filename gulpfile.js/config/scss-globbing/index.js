const buildConfig = require('../');

module.exports = {
  watch: [`${buildConfig.sharedDirectory}/**/*.scss`, `${buildConfig.clientDirectory}/assets/icons/**/*.*`], // icons sprite-ifying will be handled by compass, so watch that too
  src: `${buildConfig.clientDirectory}/_index.scss`,
  dest: `${buildConfig.clientDirectory}/`,
  outputName: 'style.scss'
};
