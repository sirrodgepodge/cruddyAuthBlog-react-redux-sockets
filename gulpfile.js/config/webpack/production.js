const webpack         = require('webpack'),
      buildConfig     = require('../');
      // webpackManifest = require('../../lib/webpackManifest'); // check this out later for revisioning

/***********************************************************************
 * @TODO: Reconcile development/test/production cofiguration.          *
 * Webpack's dev configuration is now handled in webpack.config.js     *
 * This file is currently used for production **only**.                *
 ***********************************************************************
 * @TODO: Rewrite gulpfile.js/tasks/webpack-production.js              *
 ***********************************************************************/

// Path vars
const jsSrc = `${buildConfig.rootDirectory}/`,
      jsDest = `${buildConfig.publicDirectory}/`,
      publicPath = '/';  // public javascript file kept at root


const webpackConfig = {
  devtool: 'source-map',

  entry: [
    './client/index.js'
  ],

  output: {
    path: jsDest,
    filename: 'bundle.js',
    publicPath
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/],
        loader: 'babel',
        include: jsSrc,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties']
        },
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'), // sets on client too
        CLIENT: JSON.stringify(true),
        PORT: JSON.stringify(buildConfig.serverPort)
      }
    }),
    // new webpackManifest(publicPath, 'public'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '[name].js',
      minChunks: 3
    }),
    new webpack.NoErrorsPlugin() // prevents updating of generated files when there are errors
  ]
};

module.exports = webpackConfig;
