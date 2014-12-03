var config = require('./config.json');


var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var inject = require('gulp-inject');
var del = require('del');
var concat = require('gulp-concat');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['sass', 'inject', 'index']);

gulp.task('clean', function(cb){
	del([
		'dist'
		], cb);
})

gulp.task('index', function(){
	gulp.src('./src/index.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('templates', function(){
	gulp.src('./src/app/**/*.html')
	.pipe(gulp.dest('dist'));
});

gulp.task('inject', ['sass', 'index', 'scripts'], function(){
	var target = gulp.src('./dist/index.html');

	var sources = gulp.src(['dist/css/*.css', 'dist/js/*.js'], {read: false})
	return target.pipe(inject(sources, {relative: true}))
	.pipe(gulp.dest('dist'));
});

gulp.task('scripts', ['scripts.deps', 'scripts.app']);

gulp.task('scripts.app', function(){
	gulp.src('./src/app/**/*.js')
	.pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts.deps', function(){
	gulp.src(config.dev.deps.scripts)
	.pipe(sourcemaps.init())
	.pipe(concat('deps.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(){
	gulp.src('./src/scss/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('dist/css'));
});

gulp.task('serve', ['inject', 'templates'], function(){
	browserSync({
		server:{
			baseDir: 'dist'
		}
	});

	gulp.watch(['./src/**/*.html', './src/**/*.scss', './src/**/*.js'], ['inject', 'templates', reload]);
})