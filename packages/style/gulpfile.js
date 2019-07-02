var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifyCSS = require('gulp-minify-css');

gulp.task('style', function(){
    return gulp.src('./liji-ui.scss')
        .pipe(sass())
        .pipe(uglifyCSS())
        .pipe(gulp.dest('./../../lib'))
});

//build
gulp.task('build', gulp.parallel('style'));
