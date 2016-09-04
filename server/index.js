// Grabs key-value pairs from ".env" folder and sets keys as properties on "process.env" object accessable anywhere in the app
require('dotenv').config();

// Check if in production
const inProd = process.env.NODE_ENV==='production';

// Port vars
const serverPort = process.env.PORT || 3000; // If port has been provided by environmental variables use that, else defauly to 3000
if (!inProd)
  var webPackPort = serverPort - 1; // eslint-disable-line no-var


      // Express and Express middlewares
const express = require('express'),
      app = express(),
      logger = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      compression = require('compression'),
      favicon = require('serve-favicon'),
      cors = require('cors'),

      // Native Node libraries
      path = require('path'), // handles smooth joining of file paths (inserts slashes where needed, prevents double slashes)
      http = require('http'),
      server = new http.Server(app), // creates native node http server with default express config

      // Helper functions
      handleError = require('./utils/handleError').bind(null, serverPort),
      renderError = require('../client/html').renderError,

      // custom middlewares
      isomorphicRoutes = require('./customMiddleware/isomorphicRoutes'),

      // web sockets handling
      socketIo = require('socket.io'),
      io = new socketIo(server); // instantiate socket io and attach it to express app
      io.path('/socket'); // provide socket.io route


// Request parsing middleware
app.use(bodyParser.json()); // allows request body parsing
app.use(bodyParser.urlencoded({ extended: false})); // allows request query string parsing, extended : false means query string values cannot contain JSON (must be simple key-value)
app.use(cookieParser()); // allows cookie parsing (cookies are simple key value stores in the browser)


// Allow CORS (this allows you to serve assets, images for example, from other domains)
app.use(cors());


// gzips (technically compresses with zlib) responses to HTTP requests
app.use(compression());


// app root folder path
const root = path.resolve(__dirname, '..');  // __dirname is a global variable available in any file and refers to that file's directory path


// used to set favicon (little image next to page title in browser tab)
app.use(favicon(path.join(root, 'static', 'images', 'favicon.ico')));


// Set static folder
app.use(express.static(path.join(root, 'public')));


if (process.env.NODE_ENV !== 'production') {
  // Log requests to console
  app.use(logger('dev'));

  // create proxy server to webpack dev server
  const webpackUrl = `http://0.0.0.0:${webPackPort}`,
        request = require('request'),
        // detect routes that should be forwarded to webpack
        webpackRouteRegex = /\/.*(common\.js|common\.js\.map|bundle\.js|bundle\.js\.map|__webpack_hmr|hot-update.json)/i;

  // Redirecting webpack requests to webpack (should be using proxy, make this change later)
  app.get(webpackRouteRegex, (req, res) =>
    req.pipe(request(`${webpackUrl}${req.url}`)).pipe(res)); // Magic happens here
}

// retrieve DB promise
const startDbPromise = require(path.join(root, 'db'))(process.env.DATABASE_URI);

startDbPromise.then(() => {
  // Bring in API routes from crud folder
  app.use('/api', require(path.join(root, 'server', 'crud')));

  // Bring in Auth routes from auth folder (must feed in app as middlewares are added at this step)
  require(path.join(root, 'server', 'auth'))(app);

  // Handle serving of html isomorphically
  isomorphicRoutes(app);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Handle route errors
  app.use((err, req, res) => {
    handleError(err); // log to back end console
    res.status(err.status || 500);
    res.send(renderError(err)); // send error message text to front end
  });

  // Launch server on port, app.listen returns underlying httpServer instance which socket.io can hook onto
  const serverInstance = app.listen(serverPort, err =>
      err ?
      handleError(err) :
      console.log(`App is listening at port ${serverPort} (${inProd ? 'production' : 'development'})`));

  // instantiate socket actions
  require('./socket')(io);

  // handle socket errors
  io.on('error', err => {
    handleError(err);
    if (!inProd)
      io.emit('error', {message: `Socket Server Error: ${err.message}`});
  });

  // have 'socket.io' listen on Express's configured and running server instance
  io.listen(serverInstance, {'force new connection': true});
})
.catch(err => handleError(err));


module.exports = app;
