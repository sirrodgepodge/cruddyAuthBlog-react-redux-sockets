const gulp     = require('gulp'),
      sequence = require('gulp-sequence');

gulp.task('scss', cb => {
  sequence('scss-globbing', 'compass', 'clean-scss-glob', cb);
});
