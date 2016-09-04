///////// Not getting used now /

const gulp             = require('gulp'),
      iconfont         = require('gulp-iconfont'),
      config           = require('../../config/iconFonts'),
      handleErrors     = require('../../lib/handleErrors'),
      generateIconSass = require('./generateIconSass');

gulp.task('iconFonts', () =>
  gulp.src(config.src)
    .pipe(iconfont(config.options))
    .on('error', handleErrors)
    .on('codepoints', generateIconSass)
    .pipe(gulp.dest(config.dest)));
