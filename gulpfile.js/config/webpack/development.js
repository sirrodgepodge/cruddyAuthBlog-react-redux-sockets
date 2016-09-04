// http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin

// Path vars
const webpack     = require('webpack'),
      buildConfig = require('../'),
      jsSrc       = `${buildConfig.rootDirectory}/`,
      jsDest      = `${buildConfig.rootDirectory}/`,  // here we need to ignore "public" folder, not sure why...
      publicPath  = '/';  // public javascript files kept at root;


module.exports = {
  devtool: 'source-map', // 'cheap-module-eval-source-map'
  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${buildConfig.webPackPort}`,
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],

  output: {
    path: jsDest,
    filename: 'bundle.js',
    publicPath: `http://0.0.0.0:${buildConfig.webPackPort}${publicPath}` // need absolute path as webpack port differs from server port
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
          presets: ['es2015', 'react', 'react-hmre'],
          plugins: ['transform-decorators-legacy', 'transform-class-properties']
        },
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'), // sets on client too
        CLIENT: JSON.stringify(true),
        PORT: JSON.stringify(buildConfig.serverPort)
      }
    }),
    new webpack.HotModuleReplacementPlugin(), // allows for hot reloading
    new webpack.optimize.CommonsChunkPlugin({ // bunches shared files into a separate file, presumably they're libraries and won't change much so can be cached
      name: 'common',
      filename: '[name].js',
      minChunks: 3
    }),
    new webpack.NoErrorsPlugin() // prevents updating of generated files when there are errors
  ]
};
