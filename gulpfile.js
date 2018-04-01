var gulp = require('qulp');
var jade = require('gulp-jade');
var sass = require('gulp-sass');

gulp.task('copyHTML', function() {
    return gulp.src('./source/**/*.html')
        .pipe(gulp.dest('./public/'))
});

gulp.task('templates', function() {
    var YOUR_LOCALS = {};

    gulp.src('./source/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public/'))
});

gulp.task('sass', function() {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});