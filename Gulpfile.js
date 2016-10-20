var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
 
gulp.task('styl', function () {
    var processors = [
        autoprefixer({browsers: ['last 1 version']})
    ];
     return gulp.src('./styl/main.styl')
     	.pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(livereload());
    });

gulp.task('reload-html', function() {
	return gulp.src('./*.html')
		.pipe(livereload())
});

gulp.task('styl:watch', function () {
	livereload.listen();
	gulp.watch('./*.html', ['reload-html'])
	gulp.watch('./styl/**/*.styl', ['styl'], ['styl']);
});