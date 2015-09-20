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

var utils = require('./utils');
var config = utils.getConfig('images', 'images');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');

function getGlobExtensionString(extensions) {
  if (!extensions || extensions.length === 0) {
    return '';
  }

  var globString = '{';
  for(var i = 0; i < extensions.length; i++) {
    globString += extensions[i];
    if( i + 1 < extensions.length) {
      globString += ',';
    }
  }

  globString += '}';
  return globString;
}

var imageFormats = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
var imageFormatGlobString = getGlobExtensionString(imageFormats);

gulp.task('images:clean', function(cb) {
  del(
    [
      config.dest + '/**/*.' + imageFormatGlobString
    ],
    {dot: true}, cb);
});

gulp.task('images:dev', ['images:clean'], function() {
  return gulp.src(config.src + '/**/*.' + imageFormatGlobString)
     .pipe(gulp.dest(config.dest));
 });

gulp.task('images:prod', ['images:clean'], function() {
  return gulp.src(config.src + '/**/*.' + imageFormatGlobString)
    .pipe(
      plugins.cache(
        plugins.imagemin({
          progressive: true,
          interlaced: true,
          svgoPlugins: [{removeViewBox: false}]
        })
      ))
     .pipe(gulp.dest(config.dest));
 });
