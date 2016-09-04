'use strict';

// lodash is a popular javascript helper library
const _ = require('lodash');

// bring in bluebird polyfill+enhancement and configure it
const bluebird = require('bluebird');
bluebird.config({
  warnings: {
    wForgottenReturn: false // get rid of console warning for promises not returning promises (causes obnoxious console warning from 'connect-mongo' npm otherwise)
  }
});

// polyfill or augment ES6 native promises with 'bluebird' throughout app
global.Promise = global.Promise && _.merge(global.Promise, require('bluebird')) || require('bluebird');

//enables es6 in all back end files following this one
require('babel-core/register');

// start app
require('./server');
