'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    concat = require('gulp-concat'),
    spritesmith = require('gulp.spritesmith'),
    svgSprite = require('gulp-svg-sprite'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    wait = require('gulp-wait'),
    plumber = require('gulp-plumber'),
    newer = require('gulp-newer'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;


var path = {
  build: { //Тут мы укажем куда складывать готовые после сборки файлы
    html: 'build/',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    favicon: 'build/favicon/'
  },
  src: { //Пути откуда брать исходники
    pug: 'src/pug/*.pug', //Синтаксис src/*.pug говорит gulp что мы хотим взять все файлы с расширением .pug
    js: 'src/js/*.js',
    jsLibs: 'src/js/libs/**/*.js',
    style: 'src/style/main.scss',
    img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
    sprite: 'src/img/sprite/*.*',
    spritesvg: 'src/img/spritesvg/*.*',
    fonts: 'src/fonts/**/*.*',
    favicon: 'src/favicon/**/*.*'
  },
  watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
    pug: 'src/**/*.pug',
    js: 'src/js/**/*.js',
    jsLibs: 'src/js/libs/**/*.js',
    style: 'src/style/**/*.scss',
    img: 'src/img/**/*.*',
    sprite: 'src/img/sprite/*.*',
    spritesvg: 'src/img/spritesvg/*.*',
    fonts: 'src/fonts/**/*.*',
    favicon: 'src/favicon/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: false,
  host: 'localhost',
  port: 9000,
  logPrefix: "dishep"
};

gulp.task('pug:build', function () {
  gulp.src(path.src.pug) //Выберем файлы по нужному пути
    .pipe(plumber())
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
    .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('js:build', function () {
  gulp.src(path.src.js) 
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    //.pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
    .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('jsLibs:build', function () {
  return gulp.src(['src/js/libs/jquery-3.2.1.min.js', 'src/js/libs/html5.js', 'src/js/libs/svg4everybody.min.js', 'src/js/libs/jquery.sticky-kit.min.js']) //Выберем файлы по нужному пути
    .pipe(sourcemaps.init()) //Инициализируем sourcemap
    .pipe(concat('libs.min.js'))
    .pipe(uglify()) //Сожмем наш js
    .pipe(sourcemaps.write()) //Пропишем карты
    .pipe(gulp.dest(path.build.js)) //Выплюнем их в папку build
    .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('style:build', function () {
  gulp.src(path.src.style) //Выберем наш main.scss
    .pipe(plumber())
    .pipe(sourcemaps.init()) //То же самое что и с js
    .pipe(wait(500))
    .pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    })) //Скомпилируем
    .pipe(prefixer()) //Добавим вендорные префиксы
    //.pipe(cleanCSS()) //Сожмем
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.build.css)) //И в build
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
  gulp.src([path.src.img, '!src/img/sprite/*.*', '!src/img/spritesvg/*.*']) //Выберем наши картинки
    .pipe(plumber())
    .pipe(newer(path.build.img))
    .pipe(imagemin({ //Сожмем их
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.build.img)) //И бросим в build
    .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('fonts2:build', function() {
  gulp.src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('favicon:build', function() {
  gulp.src(path.src.favicon)
    .pipe(gulp.dest(path.build.favicon))
    .pipe(reload({stream: true}));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src(path.src.sprite)
    .pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: '../img/sprite.png',
      cssFormat: 'scss',
      algorithm: 'binary-tree',
    }));
    spriteData.img.pipe(gulp.dest('src/img/')).pipe(reload({stream: true}))
    spriteData.css.pipe(gulp.dest('src/style/')).pipe(reload({stream: true}));
});

gulp.task('spritesvg', function() {
  config = {
    mode : {
      symbol : {
        dest: '',
        sprite: 'spritesvg.svg',
      }
    }
  };
  gulp.src(path.src.spritesvg)
    .pipe(cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {xmlMode: true}
      }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite(config))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

gulp.task('build', [
  'pug:build',
  'js:build',
  'jsLibs:build',
  'style:build',
  'fonts:build',
  'fonts2:build',
  'image:build',
  //'sprite', // !!!!!!
  //'spritesvg' // !!!!!!
]);

gulp.task('watch', function(){
  watch([path.watch.sprite], function(event, cb) {
    gulp.start('sprite');
  });
  watch([path.watch.spritesvg], function(event, cb) {
    gulp.start('spritesvg');
  });
  watch([path.watch.pug], function(event, cb) {
    gulp.start('pug:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.jsLibs], function(event, cb) {
    gulp.start('jsLibs:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts2:build');
  });
});

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('manual', ['webserver', 'watch']);
gulp.task('default', ['build', 'webserver', 'watch']);