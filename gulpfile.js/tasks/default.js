const gulp = require('gulp');
const dotenv = require('dotenv');

dotenv.config();

gulp.task('default', [process.env.NODE_ENV==='production' ? 'build:production' : 'build:development']);
