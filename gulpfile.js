var gulp = require('gulp'),
    opn = require('opn'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber');

gulp.task('connect', function() {
    connect.server({
        root: [__dirname],
        port: 3000,
        livereload: true
    });
    opn('http://localhost:3000');
});

gulp.task('sass', function() {
    gulp.src('./sass/styles.sass')
        .pipe(plumber())
        .pipe(sass())
        .pipe(prefix({
            browsers: ['last 2 version']
        }))
        .pipe(gulp.dest('css/'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src('')
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['sass/styles.sass'], ['sass']);
    gulp.watch(['js/*.js'], ['js']);
});

gulp.task('default', ['connect', 'sass', 'watch']);