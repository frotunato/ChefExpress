var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var order = require('gulp-order');

gulp.task('production', function() {
  gulp.src('client/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(order(['client/app/app.js', 
      'client/app/recetas/recetas.js', 
      'client/app/ingredientes/ingredientes.js', 
      'client/app/inicio/inicio.js', 
      'client/app/login/login.js'], {base: './'}))
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({mange: false}))
    .pipe(gulp.dest('dist'));
});