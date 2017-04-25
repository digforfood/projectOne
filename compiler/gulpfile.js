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
	extend = require('postcss-simple-extend'),
	WebServ = require('./wserv'),
	webServ = new WebServ();


function log(error) {
	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");
};

gulp.task('sjs', function () {
	return gulp.src('./../_src/server/main.js')
		.pipe(rigger())
		.pipe(gulp.dest('./../build/server/'));
});

gulp.task('cjs', function () {
	return gulp.src('./../_src/client/js/main.js')
		.pipe(rigger())
		.pipe(gulp.dest('./../build/client/static/'));
});

gulp.task('pcss', function () {
	var proccesors = [
		autoprefixer({browsers: ['last 2 version']}),
		importcss,
		nested,
		vars,
		extend
	];

	return gulp.src('./../_src/client/css/app.css')
		.pipe(plumber({errorHandler: log}))
		.pipe(postcss(proccesors))
		.pipe(gulp.dest('./../build/client/static/'));
});

gulp.task('html-partials', function () {
	return gulp.src('./../_src/client/index.html')
		.pipe(rigger())
		.pipe(gulp.dest('./../build/client/'));
});

gulp.task('watch', function () {
	watch('./../_src/server/**/*', function () {
		gulp.start('sjs');
	});
	watch('./../_src/client/js/**/*', function () {
		gulp.start('cjs');
	});
	watch('./../_src/client/css/**/*', function () {
		gulp.start('pcss');
	});
	watch('./../_src/client/*.html', function () {
		gulp.start('html-partials');
	});
});

gulp.task('default', function () {
	webServ.listen();
	gulp.start('pcss', 'sjs', 'cjs', 'html-partials', 'watch');
});
