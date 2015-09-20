'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');

// Load custom tasks from the `tasks` directory
// This must be defined AFTER the GLOBAL.config
require('require-dir')('gulp-tasks');

gulp.task('watch', function() {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: './' + GLOBAL.CanonicalApps.dest,
    },
    logPrefix: 'GF',

    // Prevent browser sync from display in page notifications
    notify: false,
    open: false,
  });

  gulp.watch('./src/**/*.scss', ['styles']).on('change', browserSync.reload);
  gulp.watch('./src/*.*', ['root']).on('change', browserSync.reload);
  gulp.watch('./src/**/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('./src/images/**/*.*', ['images:dev'])
    .on('change', browserSync.reload);
  gulp.watch('./src/scripts/**/*.js', ['scripts:dev'])
    .on('change', browserSync.reload);
  //gulp.watch('./src/third_party/**/*.*', ['third_party']);
  //gulp.watch('./src/scripts/sw.js', ['serviceworker']);
});

var allTasks = ['html', 'styles', 'root', 'images:dev', 'fonts'];

gulp.task('build:prod', ['root:clean'], function(cb) {
  allTasks.push('scripts:prod');
  runSequence(
    allTasks,
    cb);
});

gulp.task('build:dev', ['root:clean'], function(cb) {
  allTasks.push('scripts:dev');
  runSequence(
    allTasks,
    cb
  );
});

// Build production files, the default task
gulp.task('default', [], function(cb) {
  runSequence(
    ['build:dev'],
    ['watch'],
    cb);
});
