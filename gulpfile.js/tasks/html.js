var config       = require('../config')
if(!config.tasks.html) return

var browserSync  = require('browser-sync')
var data         = require('gulp-data')
var gulp         = require('gulp')
var gulpif       = require('gulp-if')
var handleErrors = require('../lib/handleErrors')
var htmlmin      = require('gulp-htmlmin')
var path         = require('path')
var jade = require('gulp-jade')
var fs           = require('fs')


var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

var paths = {
    src: [path.join(config.root.src, config.tasks.html.src, '/**/*.jade'), exclude],
    dest: path.join(config.root.dest, config.tasks.html.dest),
}

var getData = function() {
    var data = {};
    data.globals = JSON.parse(fs.readFileSync(config.tasks.html.dataFiles.globals, 'utf8'));
    data.music = JSON.parse(fs.readFileSync(config.tasks.html.dataFiles.music, 'utf8'));
    data.vendors = {};
    data.vendors.ac = JSON.parse(fs.readFileSync(config.tasks.html.dataFiles.vendors.ac, 'utf8'));
    // data.vendors.street = JSON.parse(fs.readFileSync(config.tasks.html.dataFiles.vendors.street, 'utf8'));
    // data.vendors.cc = JSON.parse(fs.readFileSync(config.tasks.html.dataFiles.vendors.cc, 'utf8'));
    return data;
}

var htmlTask = function() {
    var options = config.tasks.html.jade;
    options.data = getData();
    return gulp.src(paths.src)
        .pipe(jade(options))
        .on('error', handleErrors)
        // .pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
        .pipe(gulp.dest(config.root.dest))
        // .pipe(browserSync.stream())
}

gulp.task('html', htmlTask)
module.exports = htmlTask
