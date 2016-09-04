const gulp         = require('gulp'),
      revReplace   = require('gulp-rev-replace'),
      config       = require('../../config');

// 3) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', ['rev-iconfont-workaround'], () =>
  gulp.src(`${config.publicDirectory}/**/**.{css,js}`)
    .pipe(revReplace({
      manifest: gulp.src(`${config.publicDirectory}/rev-manifest.json`)
    }))
    .pipe(gulp.dest(config.publicDirectory)));
