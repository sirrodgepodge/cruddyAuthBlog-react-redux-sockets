const prettyError = require('pretty-error'),
      pretty = new prettyError();

module.exports = (port, err) => {
  switch (err.code) {
    case 'EACCES':
      console.error(`port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      console.log(`server error ${pretty.render(err)}`);
  }
};
