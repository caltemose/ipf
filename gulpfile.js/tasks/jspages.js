var config = require('../config');
var gulp = require('gulp');
// var concat = require('gulp-concat');
var changed = require('gulp-changed');
var browserSync = require('browser-sync');
var handleErrors = require('../lib/handleErrors');


var jsPagesTask = function () {
    /*
    1. concat bower files into js/plugins.js
    2. concat core files into js/core.js
    3. move page files into js/pages/*
     */
    // var prefs = config.tasks.jsplugins;

    return gulp.src('./src/assets/js/pages/*.js')
        .pipe(changed('./public/assets/js/pages'))
        .pipe(gulp.dest('public/assets/js/pages'))
        .pipe(browserSync.stream())
}

gulp.task('jspages', jsPagesTask)
module.exports = jsPagesTask
