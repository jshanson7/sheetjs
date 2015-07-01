'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var mergeStream = require('merge-stream');
var argv = require('yargs').argv;
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var isProduction = !!argv.production;

gulp.task('bundle', bundleAll);
gulp.task('watch', watchAll);
gulp.task('default', ['bundle', 'watch']);

var bundleConfigs = [
  {
    'entries': ['./src/sheet.js'],
    'dist': './dist',
    'file': 'sheet.js',
    'browserify': false
  },
  {
    'entries': ['./demo/src/index.js'],
    'dist': './demo/dist',
    'file': 'index.js',
    'browserify': true
  }
];

var bundlers = bundleConfigs.map(function (bundleConfig) {
  var useBrowserify = bundleConfig.browserify;
  var b = browserify(_.assign({}, watchify.args, {
    entries: bundleConfig.entries,
    debug: true
  }));
  var watchifyBundler = watchify(b);
  return {
    watch: function () {
      return useBrowserify ? 
        watchifyBundler
          .on('update', bundleAll)
          .on('log', gutil.log)
          .bundle() :
        gulp
          .watch(bundleConfig.entries, { interval: 500 }, bundleAll);
    },
    bundle: function () {
      return (
        useBrowserify ?
          watchifyBundler
            .bundle()
            .pipe(source(bundleConfig.file))
            .pipe(buffer()) :
          gulp
            .src(bundleConfig.entries)
        )
        .pipe(gulp.dest(bundleConfig.dist))
        .pipe(gulpif(isProduction, uglify()))
        .pipe(gulpif(isProduction, rename({suffix: '.min'})))
        .pipe(gulpif(isProduction, gulp.dest(bundleConfig.dist)));
    }
  }
});

function bundleAll() {
  return mergeStream.apply(gulp, _.invoke(bundlers, 'bundle'));
}

function watchAll() { _.invoke(bundlers, 'watch'); }

