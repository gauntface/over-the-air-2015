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
var config = utils.getConfig('', 'html');
var polymerConfig = utils.getConfig('polymer-components', 'polymer');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('html', function() {
  return gulp.src([
      config.src + '/**/*.html',
      '!' + polymerConfig.src + '/**'
    ])
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest(config.dest));
});
