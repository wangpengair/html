var gulp = require('gulp'),
	watch = require('gulp-watch'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	cssvars = require('postcss-simple-vars'),
	nested = require('postcss-nested'),
	browserSync = require('browser-sync').create();


gulp.task('css', function () {
	var POSTCSS_PLUGINS = [
		cssvars,
		nested,
		autoprefixer
	];

	return gulp.src('app/css/main.css')
		.pipe(postcss(POSTCSS_PLUGINS))
		.pipe(gulp.dest('app/temp/css'))
		.pipe(browserSync.stream());
});

gulp.task('watch', function () {

	browserSync.init({
		notify: false,
		server: {
			baseDir:'app'
		}
	});
	
	watch('app/index.html', function () {
		browserSync.reload();
	});

	watch('app/css/**/*.css', function () {
		gulp.start('css');
	});

});