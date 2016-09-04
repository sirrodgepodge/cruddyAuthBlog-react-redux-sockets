const gulp          = require('gulp'),
      globbing      = require('gulp-css-globbing'),
      rename        = require('gulp-rename'),
      handleErrors  = require('../../lib/handleErrors'),
      config        = require('../../config/scss-globbing');

gulp.task('scss-globbing', () =>
  gulp.src(config.src)
    .on('error', handleErrors)
    .pipe(globbing({ // allows wildcard import in .scss files
      extensions: ['.scss']
    }))
    .pipe(rename(config.outputName))
    .pipe(gulp.dest(config.dest)));
