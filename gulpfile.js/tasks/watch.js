const gulp          = require('gulp'),
      watch         = require('gulp-watch'),
      scssGlobbing  = require('../config/scss-globbing'),
      images        = require('../config/images'),
      videos        = require('../config/videos'),
      fonts         = require('../config/fonts');
      // path          = require('path');
      // iconFont      = require('../config/iconFonts');

gulp.task('watch', () => {
  watch(images.watch, () => gulp.start('images'));
  watch(videos.watch, () => gulp.start('videos'));
  watch(fonts.watch, () => gulp.start('fonts'));
  // watch(iconFont.watch, () => gulp.start('iconFonts'));  // look into this later
  watch(scssGlobbing.watch, () => gulp.start('scss'));
  // watch(path.resolve(__dirname, '..', '**', '*'), () => gulp.start('default')); // re-run gulp when gulp is editted, need to rejigger to stop webpack dev server
});
