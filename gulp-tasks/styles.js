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

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var utils = require('./utils');
var config = utils.getConfig('styles', 'styles');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var minifycss = require('gulp-minify-css');
var del = require('del');
var runSequence = require('run-sequence');

// Delete any files currently in the scripts destination path
gulp.task('styles:clean', function(cb) {
  del([config.dest + '/**/*.css'], {dot: true}, cb);
});

gulp.task('styles:sass', function() {
  return gulp.src(config.src + '/**/*.scss')
      .pipe(plugins.sass({errLogToConsole: true}))
      .pipe(plugins.autoprefixer(AUTOPREFIXER_BROWSERS))
      .pipe(minifycss())
      .pipe(plugins.license('Apache', {
        organization: 'Google Inc. All rights reserved.',
      }))
      .pipe(gulp.dest(config.dest));
});

gulp.task('styles', ['styles:clean'], function(cb) {
  runSequence(
    ['styles:sass'],
    cb
  );
});
