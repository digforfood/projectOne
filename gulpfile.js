var gulp = require('gulp'),
	colors = require('colors'),
	watch = require('gulp-watch'),
	rigger = require('gulp-rigger'),
	WebServ = require('./tools/wserv'),
	webServ = new WebServ(),

	opt = {
		path: {
			build: './build',
			src: './src'
		}
	};


function log(error) {
	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");
};

gulp.task('sjs', function () {
	return gulp.src(opt.path.src + '/server/main.js')
		.pipe(rigger())
		.pipe(gulp.dest(opt.path.build + '/server/'));
});

gulp.task('cjs', function () {
	return gulp.src(opt.path.src + '/client/js/main.js')
		.pipe(rigger())
		.pipe(gulp.dest(opt.path.build + '/client/static/'));
});

gulp.task('html-partials', function () {
	return gulp.src(opt.path.src + '/client/index.html')
		.pipe(rigger())
		.pipe(gulp.dest(opt.path.build + '/client/'));
});

gulp.task('watch', function () {
	watch(opt.path.src + '/server/**/*', function () {
		gulp.start('sjs');
	});
	watch(opt.path.src + '/client/js/**/*', function () {
		gulp.start('cjs');
	});
	watch(opt.path.src + '/client/*.html', function () {
		gulp.start('html-partials');
	});
});

gulp.task('default', function () {
	webServ.listen();
	gulp.start('sjs', 'cjs', 'html-partials', 'watch');
});
