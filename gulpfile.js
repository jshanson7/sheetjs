'use strict';

var gulp = require('gulp');
var streamify = require('gulp-streamify');
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
    'file': 'bundle.js'
  },
  {
    'entries': ['./demo/src/index.js'],
    'dist': './demo/dist',
    'file': 'bundle.js'
  }
];

var bundlers = bundleConfigs.map(function (bundleConfig) {
  var b = browserify(_.assign({}, watchify.args, {
    entries: bundleConfig.entries,
    debug: true
  }));
  var watchifyBundler = watchify(b);
  return {
    watch: function () {
      return watchifyBundler
        .on('update', bundleAll)
        .on('log', gutil.log)
        .bundle();
    },
    bundle: function () {
      return watchifyBundler
        .bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(bundleConfig.file))
        .pipe(buffer())
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

function watchAll() {
  return mergeStream.apply(gulp, _.invoke(bundlers, 'watch'));
}

