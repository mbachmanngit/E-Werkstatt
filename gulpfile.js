var gulp          = require('gulp');
var sass          = require('gulp-sass');
var cleanCSS      = require('gulp-clean-css');
var autoprefixer  = require('gulp-autoprefixer');
var rename        = require('gulp-rename');
var inject        = require('gulp-inject');
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');
var plumber       = require('gulp-plumber');
var babel         = require('gulp-babel');
var browserify    = require('gulp-browserify');
var clean         = require('gulp-clean');
var sourcemaps    = require('gulp-sourcemaps');
var htmlmin       = require('gulp-html-minifier');
var browserSync   = require('browser-sync');

var src           = './src/',
    dist          = './dist/';

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//MINIFY JS
gulp.task('js', function(){
  gulp.src(src + 'assets/js/*.js')
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel({
          presets: ['es2015'] }))
        .pipe(browserify({
          insertGlobals: true,
          debug: !gulp.env.production }))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dist + 'assets/js'))
      .pipe(browserSync.stream());
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//MINIFY SASS
gulp.task('sass', function(){
  gulp.src(src + 'assets/sass/*.sass')
      .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(rename({ basename: 'style'}))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(dist + 'assets/css'))
      .pipe(browserSync.stream());
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//MINIFY HTML
gulp.task('html', function(){
  gulp.src(dist + '*.html', {force: true})
      .pipe(clean());
  gulp.src(src + '*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest(dist))
      .pipe(browserSync.stream());
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//WATCH
gulp.task('default', function(){

  browserSync.init({
    server: './dist'
  });

  gulp.watch([src + '*.html'],['html']);
  gulp.watch([src + 'assets/sass/*.sass'],['sass']);
  gulp.watch([src + 'assets/js/*.js'],['js']);
});
