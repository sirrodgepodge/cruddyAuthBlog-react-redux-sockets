const WebpackDevServer = require('webpack-dev-server'),
      gulp             = require('gulp'),
      webpack          = require('webpack'),
      Promise          = require('bluebird'),
      buildConfig      = require('../config'),
      webpackConfig    = require('../config/webpack/development');

WebpackDevServer.prototype.listenAsync = Promise.promisify(WebpackDevServer.prototype.listen);

gulp.task('webpack:development', cb => {
  const webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
          publicPath: webpackConfig.output.publicPath,    // retrieve path from config file
          hot: true,                                      // hot reloading
          noInfo: false,                                  // shows (massive) output
          historyApiFallback: true,                       // allow deep route loading
          stats: { colors: true },                        // color console output
          headers: {                                      // enable CORS to allow access from server app
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          }
        });

  webpackDevServer.listenAsync(buildConfig.webPackPort, '0.0.0.0')
    .then(() => {
      console.log(`Webpack Dev Server listening at 0.0.0.0:${buildConfig.webPackPort}`);
      cb();
    })
    .catch((err) => console.error(err));
});
