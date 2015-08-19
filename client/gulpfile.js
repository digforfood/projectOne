var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	colors = require('colors'),
	concat = require('gulp-concat'),
	cssmin = require('gulp-cssmin'),
	watch = require('gulp-watch'),
	nested = require('postcss-nested'),
	importcss = require('postcss-import'),
	plumber = require('gulp-plumber'),
	rigger = require('gulp-rigger'),
	vars = require('postcss-simple-vars'),
	extend = require('postcss-simple-extend');

function log(error) {

	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");

};

gulp.task('pcss', function () {

	var proccesors = [
		autoprefixer({browsers: ['last 2 version']}),
		importcss,
		nested,
		vars,
		extend
	];

	return gulp.src('./../src/css/app.css')
		.pipe(plumber({errorHandler: log}))
		.pipe(postcss(proccesors))
		.pipe(gulp.dest('./static/'));

});

gulp.task('html-partials', function () {

	return gulp.src('./../src/index.html')
		.pipe(rigger())
		.pipe(gulp.dest('./'));

});

gulp.task('watch', function () {

	watch('./../src/css/**/*', function () {
		gulp.start('pcss');
	});

	watch('./../src/*.html', function () {
		gulp.start('html-partials');
	});

});

gulp.task('default', function () {

	gulp.start('pcss', 'html-partials', 'watch');

});