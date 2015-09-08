var source = require('vinyl-source-stream');
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var reactify = require('reactify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

//var exec = require('gulp-exec');

function handleErrors() {
	var args = Array.prototype.slice.call(arguments);
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, args);
	this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('sass', function() {
	gulp.src('./styles/src/*.{scss,sass}')
		// Initializes sourcemaps
		.pipe(sourcemaps.init())
		.pipe(sass({
			errLogToConsole: true
		}))
		// Writes sourcemaps into the CSS file
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./styles'));
});

gulp.task('watch', function() {
	gulp.watch('./styles/src/*.{scss,sass}', ['sass'])
});


//TODO: get this running on port 80 for socket.io performance

gulp.task('serve', function() {
	nodemon({
		script: 'server.js',
		ext: 'js html css',
		env: { 'NODE_ENV': 'development', 'PORT': 8000 }
	})
	.on('restart', function () {
		console.log('restarted!')
	});
});

var bundler = watchify(browserify({
	entries: ['./js/src/app.jsx'],
	transform: [reactify],
	extensions: ['.jsx'],
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

function bundle() {
	return bundler
		.bundle()
		.on('error', notify)
		.pipe(source('js/app.js'))
		.pipe(gulp.dest('./'))
}
bundler.on('update', bundle)

gulp.task('build', function() {
	bundle();
});

gulp.task('default', ['build', 'sass', 'watch', 'serve']);
