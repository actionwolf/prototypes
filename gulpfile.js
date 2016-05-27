var gulp = require('gulp');
var browserify = require('gulp-browserify');
var gulpif = require('gulp-if');
var gulpclean = require('gulp-clean');
var react = require('gulp-react');

require('reactify');

gulp.task('clean', function(){
	return gulp.src('dist', {read: false})
		.pipe(gulpclean({force: true}));
});

gulp.task('move:static:html', function(){
	return gulp.src('html/**/*.*')
		.pipe(gulp.dest('dist/html'));
});

gulp.task('move:static:data', function(){
	return gulp.src('data/**/*.*')
		.pipe(gulp.dest('dist/data'));
});

gulp.task('move:static:image', function(){
	return gulp.src('image/**/*.*')
		.pipe(gulp.dest('dist/image'));
});

gulp.task('move:static:video', function(){
	return gulp.src('video/**/*.*')
		.pipe(gulp.dest('dist/video'));
});

gulp.task('build:js', function(){
	return gulp.src('src/**/*.js')
		.pipe(browserify({
			transform: ['reactify'],
			debug: true
		}))
		.pipe(gulp.dest('dist/build'));
});

gulp.task('build', ['move:static:html', 'move:static:data', 'move:static:image', 'move:static:video', 'build:js'], function(){
	return gulp.src('src/**/*.html')
		.pipe(gulp.dest('dist/build/'));
});