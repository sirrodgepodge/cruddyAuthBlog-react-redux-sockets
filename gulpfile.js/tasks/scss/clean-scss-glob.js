const gulp              = require('gulp'),
      rimraf            = require('rimraf'),
      buildConfig       = require('../../config'),
      generatedFileName = require('../../config/scss-globbing').outputName;

gulp.task('clean-scss-glob', cb => {
  rimraf.sync(`${buildConfig.clientDirectory}/${generatedFileName}`);
  cb();
});
