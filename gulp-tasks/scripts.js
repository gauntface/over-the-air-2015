/**
 *
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var utils = require('./utils');
var config = utils.getConfig('scripts', 'scripts');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var glob = require('glob');
var path = require('path');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var stylish = require('jshint-stylish');

var es6FileGlob = '/**/*.es6.js';

// Takes a set of objects defining inputs of javascript files
// to run through browserify and babelify
function compileES6Classes(browserifyFileEntries, minify) {
  browserifyFileEntries.forEach(function(fileEntry) {
    var browserifyBundle = browserify({
        entries: [fileEntry.srcPath],
      })
      .transform(babelify);

    var finalStream = browserifyBundle.bundle()
      .on('log', plugins.util.log.bind(plugins.util, 'Browserify Log'))
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
      .pipe(source(fileEntry.outputFilename));

    if (minify) {
      finalStream = finalStream.pipe(streamify(plugins.uglify()));
    }

    return finalStream.pipe(gulp.dest(fileEntry.dest));
  });
}

// This takes a source path and finds all files ending
// with .es6.js and creates the bundles to run through browserify
// and babelify
function handleES6Scripts(srcPath, minify) {
  var es6Filepaths = glob.sync(srcPath + es6FileGlob);

  var browserifyFileEntries = [];
  es6Filepaths.forEach(function(filepath) {
    var filename = path.basename(filepath);
    var directoryOfFile = path.dirname(filepath);
    var relativeDirectory = path.relative(
      srcPath,
      directoryOfFile);

    // Replace .es6.js with .js for the final output
    filename = filename.substring(0, filename.length - '.es6.js'.length) + '.js';

    browserifyFileEntries.push({
      srcPath: './' + filepath,
      outputFilename: filename,
      dest: path.join(config.dest, relativeDirectory)
    });
  });

  compileES6Classes(browserifyFileEntries, minify);
}

gulp.task('scripts:lint', function() {
  return gulp.src([config.src + es6FileGlob])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(stylish));
});

gulp.task('scripts:es6:dev', ['scripts:lint'], function(cb) {
  handleES6Scripts(config.src, false);

  cb();
});

gulp.task('scripts:es6:prod', ['scripts:lint'], function(cb) {
  handleES6Scripts(config.src, true);

  cb();
});

// Delete any files currently in the scripts destination path
gulp.task('scripts:clean', function(cb) {
  del([config.dest + '/**/*.js'], {dot: true}, cb);
});

gulp.task('scripts:dev', ['scripts:clean'], function(cb) {
  runSequence(
    ['scripts:es6:dev'],
    cb
  );
});

gulp.task('scripts:prod', ['scripts:clean'], function(cb) {
  runSequence(
    ['scripts:es6:prod'],
    cb
  );
});
