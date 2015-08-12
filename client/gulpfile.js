var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	colors = require('colors'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	watch = require('gulp-watch'),
	nested = require('postcss-nested-props'),
	importcss = require('postcss-import'),
	plumber = require('gulp-plumber');

function log(error) {

	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");

};

gulp.task('pcss', function () {

	var proccesors = [
		autoprefixer({browsers: ['last 2 version']}),
		nested,
		importcss
	];

	return gulp.src('./../src/css/app.css')
		.pipe(plumber({errorHandler: log}))
		.pipe(postcss(proccesors))
		.pipe(gulp.dest('./data/'));

});

gulp.task('watch', function () {

	watch('./../src/css/**/*', function () {
		gulp.start('pcss');
	});

});

gulp.task('default', function () {

	gulp.start('pcss', 'watch');

});