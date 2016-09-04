/////// NOT getting used now

const buildConfig     = require('../');
const fontConfig = require('../fonts');

module.exports = {
  name: 'Gulp Starter Icons',
  watch: `${buildConfig.assetsDirectory}/icons/*.svg`,
  src: `${buildConfig.assetsDirectory}/icons/*.svg`,
  dest: fontConfig.dest,
  sassDest: `${buildConfig.assetsDirectory}/stylesheets/generated`,
  template: './page-creator/gulpfile.js/tasks/iconFont/template.sass',
  sassOutputName: '_icons.sass',
  fontPath: '../../../assets/fonts',
  className: 'icon',
  options: {
    fontName: 'icons',
    appendCodepoints: true,
    normalize: false
  }
};
