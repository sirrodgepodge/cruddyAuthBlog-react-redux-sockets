const gulp = require('gulp'),
      knexjs = require('knex'),
      config = require('./../../config/migrate')();

gulp.task('migrate:rollback', () => {
  const knex = knexjs(config);
  return knex.migrate.rollback({
    directory : './database/migrations'
  }).then(() => {
    knex.destroy();
  }).catch((err) => {
    console.error(err);
    knex.destroy();
  });
});
