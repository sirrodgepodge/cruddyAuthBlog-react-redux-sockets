const gulp         = require('gulp'),
      gulpSequence = require('gulp-sequence');

gulp.task('build:production', cb => {
  gulpSequence('clean', ['fonts', 'images', 'videos', 'scss'], 'webpack:production', cb);
});
