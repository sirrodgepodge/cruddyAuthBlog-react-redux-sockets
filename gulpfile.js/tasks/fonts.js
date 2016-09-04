const changed     = require('gulp-changed'),
      config      = require('../config/fonts'),
      gulp        = require('gulp');

gulp.task('fonts', () =>
  gulp.src(config.src)
    .pipe(changed(config.dest)) // "changed" ignores unchanged files
    .pipe(gulp.dest(config.dest)));
