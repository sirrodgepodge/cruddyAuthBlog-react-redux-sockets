const gulp        = require('gulp'),
      changed     = require('gulp-changed'),
      imagemin    = require('gulp-imagemin'),
      config      = require('../config/images'),
      handleErrors = require('../lib/handleErrors');

gulp.task('images', () =>
  gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(imagemin()) // Optimize
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors));
