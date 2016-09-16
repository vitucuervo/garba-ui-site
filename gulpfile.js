var gulp        = require('gulp'),
    del         = require('del'), // rm -rf
    sass        = require('gulp-sass'),
    fs          = require('fs'),
    sourcemaps  = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    concat      = require('gulp-concat'),
    preprocess  = require('gulp-preprocess'),
    rename      = require('gulp-rename');




gulp.task('delete', function() {
    return del(['dist']);
});

gulp.task('sass', function () {
  // Incluye css del sitio y el de garbaui
  var css = ['./node_modules/garba-ui/dist/stylesheets/garbaui.min.css', './sass/styles.scss'];
  return gulp.src(css)
 
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
 
  .pipe(concat('styles.css'))
  .pipe(gulp.dest('./dist/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('copyFontsIcon', function() {
  fs.readFile('APP_VERSION', 'utf8', function (err , data) {
    return gulp.src('./node_modules/garba-ui/dist/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
  });
});

gulp.task('default', function() {
    runSequence('delete','sass', 'sass:watch', 'copyFontsIcon')
});