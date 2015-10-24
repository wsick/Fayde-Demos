var gulp = require('gulp'),
    ts = require('gulp-typescript'),
    sourcemaps = require('gulp-sourcemaps');

module.exports = function (meta) {
    gulp.task('default', function () {
        return gulp.src(meta.src)
            .pipe(sourcemaps.init())
            .pipe(ts({
                target: 'ES5',
                module: 'amd',
                rootDir: 'app'
            }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('app/.build'));
    });
};