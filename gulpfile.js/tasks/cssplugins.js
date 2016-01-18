var config = require('../config');
var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var handleErrors = require('../lib/handleErrors');


var cssPluginTask = function () {
    var prefs = config.tasks.cssplugins;

    return gulp.src(prefs.src)
        .pipe(concat(prefs.file))
        .on('error', handleErrors)
        // .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
        .pipe(gulp.dest(prefs.dest))
        .pipe(browserSync.stream())
}

gulp.task('cssplugins', cssPluginTask)
module.exports = cssPluginTask
