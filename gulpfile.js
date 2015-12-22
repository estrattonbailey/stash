var gulp = require('gulp'),
    webpack = require('gulp-webpack');

require('./tasks/hbs.js');
require('./tasks/sass.js');

gulp.task('js', function(){
  return gulp.src('./src/js/main.js')
  .pipe(webpack(require('./webpack.config.js')))
  .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('default', ['sass','js','hbs'], function(){
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['js']);
  gulp.watch('./src/**/*.handlebars', ['hbs']);
});
