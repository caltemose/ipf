var rsync = require('gulp-rsync');
var gulp = require('gulp');

gulp.task('deploy-dev', function() {
    return gulp.src('public/**')
        .pipe(rsync({
            root: 'public',
            hostname: 'ipf.chadzilla.com',
            destination: '/home/ipfestival/ipf.chadzilla.com/',
            username: 'ipfestival',
            progress: true,
            recursive: true
    }));
});
