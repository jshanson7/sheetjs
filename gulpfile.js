'use strict';

var gulp = require('gulp');
var argv = require('yargs').argv;
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var _ = require('lodash');
var isProduction = !!argv.production;

var bundleMaps = [
  {
    'entries': ['./src/sheet.js'],
    'dist': './dist',
    'file': 'bundle.js'
  },
  {
    'entries': ['./demo/src/index.js'],
    'dist': './demo/dist',
    'file': 'bundle.js'
  }
];

var bundlers = bundleMaps.map(function (bundleMap) {
  var b = browserify(_.assign({}, watchify.args, {
    entries: bundleMap.entries,
    debug: true
  }));
  var w = watchify(b);
  return {
    'watch': _.partial(watch, w),
    'bundle': _.partial(bundle, w, bundleMap)
  }
});

function watch (bundler) {
  bundler.on('update', bundleAll);
  bundler.on('log', gutil.log);
}

function bundle (bundler, bundleMap) {
  bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(bundleMap.file))
    .pipe(buffer())
    .pipe(gulp.dest(bundleMap.dist));

  if (isProduction) {
    bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Uglify Error'))
      .pipe(source(bundleMap.file))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(bundleMap.dist));
  }
}

function watchAll () { _.invoke(bundlers, 'watch'); }
function bundleAll () { _.invoke(bundlers, 'bundle'); }

gulp.task('default', function (done) {
  bundleAll();
  watchAll();
});
