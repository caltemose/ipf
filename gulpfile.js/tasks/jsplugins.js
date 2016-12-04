var config = require('../config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var handleErrors = require('../lib/handleErrors');


var jsPluginsTask = function () {
    /*
    1. concat bower files into js/plugins.js
    2. concat core files into js/core.js
    3. move page files into js/pages/*
     */
    var prefs = config.tasks.jsplugins;

    return gulp.src(prefs.src)
        .pipe(concat('plugins.js'))
        .on('error', handleErrors)
        // .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
        .pipe(gulp.dest('public/assets/js/'))
        .pipe(browserSync.stream())
}

gulp.task('jsplugins', jsPluginsTask)
module.exports = jsPluginsTask
