const gulp = require('gulp'),
      knexjs = require('knex'),
      config = require('./../../config/migrate')();

gulp.task('migrate:latest', () => {
  const knex = knexjs(config);
  return knex.migrate.latest({
    directory : './database/migrations'
  }).then(() => {
    knex.destroy();
  }).catch((err) => {
    console.error(err);
    knex.destroy();
  });
});
