const buildConfig = require('../'),
      // refills = require('node-refills').includePaths, // do we need this????
      generatedFileName = require('../scss-globbing').outputName;

module.exports = {
  autoprefixer: { browsers: ['last 2 version'] }, // https://github.com/ai/browserslist#queries
  src: `${buildConfig.clientDirectory}/${generatedFileName}`,
  dest: `${buildConfig.publicDirectory}/`,
  settings: {
    sass: `${buildConfig.clientDirectory}/`,
    javascript: `${buildConfig.publicDirectory}/`,
    css: `${buildConfig.publicDirectory}/`,
    image: `${buildConfig.publicAssetsDirectory}/images`,
    font: `${buildConfig.publicAssetsDirectory}/fonts`,
    environment: process.env.NODE_ENV,
    debug: process.env.NODE_ENV !== 'production',
    sourcemap: process.env.NODE_ENV !== 'production'
  }
};
