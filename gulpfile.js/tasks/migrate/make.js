const gulp = require('gulp'),
      knexjs = require('knex'),
      argv = require('yargs').argv,
      config = require('./../../config/migrate')();

gulp.task('migrate:make', () => {
  const knex = knexjs(config);
  const migrationName = argv.name;
  return knex.migrate.make(migrationName, {
    directory : './database/migrations'
  }).then(() => {
    knex.destroy();
  }).catch((err) => {
    console.error(err);
    knex.destroy();
  });
});
