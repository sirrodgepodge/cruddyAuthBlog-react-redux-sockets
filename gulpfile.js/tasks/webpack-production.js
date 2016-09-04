const gulp          = require('gulp'),
      webpack       = require('webpack'),
      webpackConfig = require('../config/webpack/production'),
      logger        = require('../lib/compileLogger');

gulp.task('webpack:production', cb => {
  webpack(webpackConfig, (err, stats) => {
    //run logger
    logger(err, stats);

    // tell gulp that we're done
    cb();
  });
});
