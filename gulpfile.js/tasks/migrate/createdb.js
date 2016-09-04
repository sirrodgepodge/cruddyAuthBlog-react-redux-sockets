const gulp = require('gulp'),
      knexjs = require('knex'),
      config = require('./../../config/migrate')('postgres');

gulp.task('migrate:createdb', () => {
  const knex = knexjs(config);
  return knex.raw('CREATE DATABASE ' + process.env.POSTGRES_DB + ';') // eslint-disable-line prefer-template
  .then(() => {
    knex.destroy();
  }).catch((error) => {
    console.log(error);
  });
});
