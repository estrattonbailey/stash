var gulp = require('gulp'),
    hbs = require('gulp-compile-handlebars'),
    rename = require('gulp-rename');

gulp.task('hbs', function(){
  var options = {
    batch: ['./src/partials'],
    helpers: {
      asset: function(file){
        if (file.indexOf('.js') > -1){
          return './assets/js/' + file
        } else if (file.indexOf('.css') > -1){
          return './assets/css/' + file
        } else if (file.indexOf('.png') > -1){
          return './assets/images/' + file
        } else if (file.indexOf('.jpg') > -1){
          return './assets/images/' + file
        } else if (file.indexOf('.jpg') > -1){
          return './assets/images/' + file
        }
      }
    }
  }
  return gulp.src('./src/index.handlebars')
  .pipe(hbs('',options))
  .pipe(rename('index.html'))
  .pipe(gulp.dest('./dist'));
});
