'use strict';
require('dotenv').config();

module.exports = db => ({
  client: 'pg',
  connection: process.env.POSTGRES_URI + (db || process.env.POSTGRES_DB),
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: process.env.KNEX_MIGRATIONS
  }
});
