'use strict';

// Include Gulp & tools we'll use
var gulp = require('gulp');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

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

  watch('./src/**/*.scss', function() {
    gulp.start('styles', function() {
      browserSync.reload();
    });
  });
  watch('./src/*.*', function() {
    gulp.start('root', function() {
      browserSync.reload();
    });
  });
  watch('./src/**/*.html', function() {
    gulp.start('html', function() {
      browserSync.reload();
    });
  });
  watch('./src/images/**/*.*', function() {
    gulp.start('images:dev', function() {
      browserSync.reload();
    });
  });
  watch('./src/scripts/**/*.js', function() {
    gulp.start('scripts:dev', function() {
      browserSync.reload();
    });
  });
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
