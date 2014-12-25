var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var jshint = require('gulp-jshint');
var order = require('gulp-order');
var stripDebug = require("gulp-strip-debug");

gulp.task('production', function() {

  gulp
    .src(['client/bower_components/angular/angular.js', 
      'client/bower_components/angular-route/angular-route.js', 
      'client/bower_components/angular-strap/dist/angular-strap.js',
      'client/bower_components/angular-loading-bar/build/loading-bar.js',
      'client/app/**/*.js',
      'client/components/**/*.js'],
      {base: './'})
    
    .pipe(order([
      'client/bower_components/angular/angular.js', 
      'client/bower_components/angular-route/angular-route.js', 
      'client/bower_components/angular-strap/dist/angular-strap.js',
      'client/bower_components/angular-loading-bar/build/loading-bar.js',
      'client/app/app.js', 
      'client/app/recetas/recetas.js', 
      'client/app/ingredientes/ingredientes.js', 
      'client/app/inicio/inicio.js', 
      'client/app/login/login.js',
      'client/app/utils/utils.js',
      'client/app/navbar/navbar.js'],
      {base: './'}))
    
    .pipe(stripDebug())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({mangle: false}))
    .pipe(gulp.dest('dist'));
 });