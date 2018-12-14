const { watch, series, src, dest } = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const rigger = require('gulp-rigger');

const WebServ = require('./tools/wserv');
const webServ = new WebServ();

const opt = {
		path: {
			build: './build',
			src: './src'
		}
	};

function log(error) {
	console.log(("[" + error.name + " in " + error.plugin + "]").red.bold.inverse,
	error.message + "]");
};

function sjs () {
	return src(opt.path.src + '/server/main.js')
		.pipe(rigger())
		.pipe(dest(opt.path.build + '/server/'));
};

function cjs () {
	return src(opt.path.src + '/client/js/main.js')
		.pipe(rigger())
		.pipe(dest(opt.path.build + '/client/static/'));

	// return src(opt.path.src + '/client/js/main.ts')
	// 	.pipe(rigger())
	// 	.pipe(tsProject())
	// 	.js
	// 	.pipe(dest(opt.path.build + '/client/static/'));
};

function htmlPartials () {
	return src(opt.path.src + '/client/index.html')
		.pipe(rigger())
		.pipe(dest(opt.path.build + '/client/'));
};

watch(opt.path.src + '/server/**/*', { delay: 500 }, sjs);
watch(opt.path.src + '/client/js/**/*', { delay: 500 }, cjs);
watch(opt.path.src + '/client/*.html', { delay: 500 }, htmlPartials);

exports.default = series(sjs, cjs, htmlPartials, () => {webServ.listen();});
