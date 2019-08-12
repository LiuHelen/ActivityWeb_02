'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var pump = require('pump');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');
var htmlmin = require('gulp-htmlmin');
var del = require('del');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngQuant = require('imagemin-pngquant');

var src = {
    root: 'src',
    html: '',
    css: 'src/scss',
    js: 'src/js',
    lib: 'src/lib',
    img: 'src/img'
};
var dist = {
    root: 'dist',
    html: '',
    css: 'dist/css',
    js: 'dist/js',
    lib: 'dist/library',
    img: 'dist/images'
};


//清除dist檔案
gulp.task('clean', function (callback) {
    del([
        `${dist.root}/*`,
        `!${src.root}/**/*`
    ], callback);
});

gulp.task('html', function (callback) {
    pump([
        gulp.src(`${src.root}/**/*.html`),
        //htmlmin({collapseWhitespace: true}),
        gulp.dest(dist.root),
        browserSync.stream()
    ], callback);
});

gulp.task('sass', function (callback) {
    pump([
        gulp.src(`${src.css}/**/*.{sass,scss,css}`),
        sass({
            //壓縮程度: nested, expanded, compact, compressed
            outputStyle: 'compressed'
        }),
        autoprefixer({
            //自動增加前綴
            browsers: ['IE 11', 'ios 8'],
            cascade: false
        }),
        gulp.dest(dist.css),
        browserSync.stream()
    ], callback);
});

gulp.task('js', function (callback) {
    pump([
        gulp.src(`${src.js}/**/*.js`),
        jshint({
            esnext: true
        }),
        jshint.reporter(),
        babel({
            presets: ['es2015']
        }),
        //js合併一隻檔案 最後輸出名子
        //concat('index.js'),
        //uglify(),
        gulp.dest(dist.js),
        browserSync.stream()
    ], callback);
});

gulp.task('copy', function (callback) {
    pump([
        gulp.src(`${src.lib}/**/*.js`),
        gulp.dest(dist.lib),
    ], callback);
});

//網頁伺服器
gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: dist.root,
            index: 'index.html'
        },
        port: 8080,
        open: 'external'
    });
});

gulp.task('img', function (callback) {
    pump([
        gulp.src(`${src.img}/**/*`),
        imagemin([
            imagemin.gifsicle(),
            imageminJpegRecompress({
                loops: 6,
                min: 40,
                max: 85,
                quality: 'low'
            }),
            imageminPngQuant(),
            imagemin.svgo()
        ]),
        gulp.dest(dist.img),
        browserSync.stream()
    ], callback);
});


gulp.task('watch_img', function () {
    watch(`${src.img}/**/*`).on('add', function (path) {
        var newFile = path.match(/([^\\]+)$/g)[0];
        console.log('新圖片: ', newFile);
        pump([
            gulp.src(src.img + newFile),
            imagemin([
                imagemin.gifsicle(),
                imageminJpegRecompress({
                    loops: 6,
                    min: 40,
                    max: 85,
                    quality: 'low'
                }),
                imageminPngQuant(),
                imagemin.svgo()
            ]),
            gulp.dest(dist.img),
            browserSync.stream()
        ]);
    });
});

gulp.task('watch', function () {
    gulp.watch([`./${src.html}/**/*.html`], ['html']);
    gulp.watch([`./${src.css}/**/*.{sass,scss,css}`], ['sass']);
    gulp.watch([`./${src.js}/**/*.js`], ['js']);
});


gulp.task('default', ['clean', 'serve', 'html', 'sass', 'js', 'copy', 'img', 'watch_img', 'watch']);