var config       = require('../config')
var changed = require('gulp-changed')
var gulp    = require('gulp')
var path    = require('path')

if(!config.tasks.html.dataFiles.vendors) return

// var paths = {
//   src: path.join(config.root.src, config.tasks.static.src, '/**'),
//   dest: path.join(config.root.dest, config.tasks.static.dest)
// }

var paths = {
  src: './data-processing/2015/json/**',
  dest: './src/data/'
}

var copyDataTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
}

gulp.task('copy-data', copyDataTask)
module.exports = copyDataTask
