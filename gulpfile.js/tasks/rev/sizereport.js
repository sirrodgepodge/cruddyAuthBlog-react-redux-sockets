const config       = require('../../config'),
      gulp         = require('gulp'),
      repeatString = require('../../lib/repeatString'),
      sizereport   = require('gulp-sizereport');

// 6) Report sizes
gulp.task('size-report', ['update-html'], function() {
  var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8)  + '*.*';

  return gulp.src([config.publicAssets + hashedFiles, '*!rev-manifest.json'])
    .pipe(sizereport({
        gzip: true
    }));
});
