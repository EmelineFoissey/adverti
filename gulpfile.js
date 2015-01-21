var gulp = require('gulp'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglifyjs'),
    minifyHTML = require('gulp-minify-html'),
    uncss = require('gulp-uncss');


var paths = {
    less: {
        source: 'src/less/style.less',
        dest: 'dist/css',
        watch: 'src/less/**'
    },
    js : {
        source: 'src/js/**',
        dest: 'dist/js',
        watch: 'src/js/**'
    },
    html : {
        source: 'src/index.html',
        dest: 'dist',
        watch: 'src/index.html'
    }

};

gulp.task('less', function () {
    gulp.src(paths.less.source)
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.less.dest));
});

gulp.task('less-uncss', function () {
    gulp.src(paths.less.source)
        .pipe(less())
        .pipe(uncss({
            html: ['http://localhost:8000']
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.less.dest));
});

gulp.task('js', function() {
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

gulp.task('html', function() {
    var opts = {comments:false,spare:true};

    gulp.src('src/index.html')
        //.pipe(minifyHTML(opts))
        .pipe(gulp.dest('dist/'))
});

gulp.task('watch', function () {
    gulp.watch(paths.less.watch, ['less']);
    gulp.watch(paths.html.watch, ['html']);
    gulp.watch(paths.js.watch, ['js']);
});

gulp.task('default', ['js', 'less', 'html']);
gulp.task('build', ['js', 'less-uncss', 'html']);
