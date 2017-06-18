var gulp         = require('gulp'),
	plumber      = require('gulp-plumber'),      // уведомления об ошибках
	autoprefixer = require('gulp-autoprefixer'), // установка префиксов
	notify       = require('gulp-notify'),       // всплывающие уведомления
	imagemin     = require('gulp-imagemin'),     // минификация изображений
	sass         = require('gulp-sass'),         // компилятор sass на C без compass
	rimraf       = require('rimraf');            // удаление файлов



/**
 * Пути
 */
var path = {
	build: {
		js:     'build/js/',
		css:    'build/css/',
		img:    'build/img/',
		pic:    'build/pic/'
	},
	src: {
		js:      'assets/js/**/*.js',
		sass:    'assets/sass/**/*.sass',
		img:     ['assets/img/**/*.*','!assets/img/sprite/*.*'],
		pic:     'assets/pic/**/*.*',
		sprLang: 'assets/sass/global/include/'
	},
	clean: {
		build:   './build',
		modules: './node_modules'
	}
};


/**
 *  SASS
 */
gulp.task('sass',function () {
	setTimeout(function () {
		gulp.src(path.src.sass)
			.pipe(sass.sync().on('error', sass.logError))
			.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
			.pipe(autoprefixer({
				browsers: ['last 12 versions','> 1%'],
				cascade: false,
				remove: false
			}))
			.pipe(gulp.dest(path.build.css));
	}, 2000);
});



/**
 * JS
 */
gulp.task('js', function () {
	setTimeout(function () {
		gulp.src(path.src.js)
			.pipe(gulp.dest(path.build.js));
	}, 2000);
});


/**
 * IMAGES
 */
gulp.task('img', function () {
	gulp.src(path.src.img)
		.pipe(imagemin({progressive: true }))
		.pipe(gulp.dest(path.build.img));

	gulp.src(path.src.pic)
		.pipe(imagemin({progressive: true }))
		.pipe(gulp.dest(path.build.pic));
});



/**
 * WATCH
 */
gulp.task('watch',function () {
	gulp.watch(path.src.sass,['sass']);
	gulp.watch(path.src.js,['js']);
	gulp.watch(path.src.img,['img']);
	gulp.watch(path.src.pic,['img']);
});


/**
 * START
 */
gulp.task('default', ['sass', 'js', 'img', 'watch']);



// Очистка билда
gulp.task('clean', function (cb) {
	rimraf(path.clean.build, cb);
});

// Очистка полная
gulp.task('full-clean', function (cb) {
	rimraf(path.clean.build, cb);
	rimraf(path.clean.modules, cb);
});