// 2) Font rev workaround
const _            = require('lodash'),
      fs           = require('fs'),
      gulp         = require('gulp'),
      merge        = require('merge-stream'),
      rename       = require("gulp-rename"),
      config       = require('../../config'),
      iconConfig   = require('../../config/iconFonts');

// .ttf fonts have an embedded timestamp, which cause the contents
// of the file to change ever-so-slightly. This was a problem for
// file reving, which generates a hash based on the contents of the file.
// This meant that even if source files had not changed, the hash would
// change with every recompile, as well as .eot, and .woff files, which
// are derived from a source svg font

// The solution is to only hash svg font files, then append the
// generated hash to the ttf, eot, and woff files (instead of
// leting each file generate its own hash)

gulp.task('rev-iconfonts-workaround', ['rev-assets'], () => {
  const manifest = require(`../../.${config.publicDirectory}/rev-manifest.json`);
  const fontList = [];

  _.each(manifest, (reference, key) => {
    const fontPath = "/assets/fonts";

    if (key.match(`${fontPath}/${iconConfig.options.fontName}`)) {
      const path = key.split('.svg')[0];
      const hash = reference.split(path)[1].split('.svg')[0];

      fontList.push({
        path,
        hash
      });
    }
  });

  // Add hash to non-svg font files
  const streams = fontList.map((file) => {
    // Add references in manifest
    ['.eot', '.woff', '.ttf'].forEach((ext) =>
      manifest[`${file.path}${ext}`] = `${file.path}${file.hash}${ext}`);

    return gulp.src(`${config.publicDirectory}/${file.path}*.!(svg)`)
      .pipe(rename({suffix: file.hash}))
      .pipe(gulp.dest(iconConfig.dest));
  });

  // Re-write rev-manifest.json to disk
  fs.writeFile(`${config.publicDirectory}/rev-manifest.json`, JSON.stringify(manifest, null, 2));

  return merge.apply(this, streams);
});
