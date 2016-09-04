const gulp     = require('gulp'),
      sequence = require('gulp-sequence');

gulp.task('build:development', cb => {
  sequence('clean', ['fonts', 'images', 'videos', 'scss'], ['webpack:development', 'watch'], cb);
});
