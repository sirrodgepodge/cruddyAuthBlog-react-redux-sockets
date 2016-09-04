const gulp           = require('gulp'),
      rimraf         = require('rimraf'),
      mkdirp         = require('mkdirp'),
      config         = require('../config');

gulp.task('clean', cb => {
  rimraf.sync(config.publicDirectory);
  mkdirp.sync(config.publicAssetsDirectory);
  cb();
});
