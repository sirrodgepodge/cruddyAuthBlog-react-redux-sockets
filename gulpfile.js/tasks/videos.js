const gulp        = require('gulp'),
      changed     = require('gulp-changed'),
      config       = require('../config/videos');

gulp.task('videos', () =>
  gulp.src(config.src)
    .pipe(changed(config.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.dest)));
