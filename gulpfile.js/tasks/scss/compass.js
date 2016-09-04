const gulp          = require('gulp'),
      compass       = require('gulp-compass'),
      autoprefixer  = require('gulp-autoprefixer'),
      cssnano       = require('gulp-cssnano'),
      sourcemaps    = require('gulp-sourcemaps'),
      handleErrors  = require('../../lib/handleErrors'),
      config        = require('../../config/compass');

gulp.task('compass', () =>
  gulp.src(config.src)
    .pipe(compass(config.settings))
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest))
    .on('error', handleErrors));
