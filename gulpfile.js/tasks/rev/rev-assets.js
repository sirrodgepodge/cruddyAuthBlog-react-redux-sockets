const config = require('../../config'),
      iconFontConfig = require('../../config/iconFonts'),
      gulp   = require('gulp'),
      rev    = require('gulp-rev');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', () => {
  // Ignore what we dont want to hash in this step
  const notThese = `!${config.publicDirectory}/**/*+(css|js|json|html)`;

  // Ignore iconFont files generated from the base svg iconFont. See rev-iconfont-workaround.js
  const orThese = `!${iconFontConfig.dest}/${iconFontConfig.options.fontName}.{eot,woff,woff2,ttf}`;

  return gulp.src([`${config.publicDirectory}/**/*`, notThese, orThese])
    .pipe(rev())
    .pipe(gulp.dest(config.publicDirectory))
    .pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
    .pipe(gulp.dest(''));
});
