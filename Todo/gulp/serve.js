var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open');

module.exports = function (meta) {
    gulp.task('serve', ['watch'], function () {
        var options = {
            url: 'http://localhost:' + meta.serve.port.toString()
        };
        gulp.src('app/index.html')
            .pipe(open('', options));

        connect.server({
            livereload: true,
            root: ['app', 'app/.build'],
            port: meta.serve.port
        });

        var distpaths = [
            'app/.build/**/*',
            'app/**/*.fap',
            'app/**/*.fayde'
        ];
        gulp.watch(distpaths, function () {
            gulp.src(distpaths).pipe(connect.reload());
        });
    });
};