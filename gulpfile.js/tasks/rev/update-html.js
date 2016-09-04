const gulp       = require('gulp'),
      config     = require('../../config'),
      revReplace = require('gulp-rev-replace');

// 5) Update asset references in HTML
gulp.task('update-html', ['rev-css'], () =>
  gulp.src(`${config.publicDirectory}/**/*.html`)
    .pipe(revReplace({
      manifest: gulp.src(`${config.publicDirectory}/rev-manifest.json`)
    }))
    .pipe(gulp.dest(config.publicDirectory)));
