/// <binding ProjectOpened='watch-sass, watch-typescript' />
const gulp = require('gulp')
const sass = require('gulp-sass')(require('node-sass'))
const del = require('del')
const ts = require('gulp-typescript')
const tsProj = ts.createProject('tsconfig.json')

const paths = {
    input: {
        sass: 'Styles/main.scss',
        ts: 'Scripts/**/*.ts'
    },
    output: {
        css: './wwwroot/css',
        js: './wwwroot/js'
    }
}

gulp.task('sass', () => {
    return gulp.src(paths.input.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.output.css));
});

gulp.task('watch-sass', () => {
    return gulp.watch(paths.input.sass, (done) => {
        gulp.series(['clean', 'sass'])(done);
    });
});

gulp.task('typescript', () => {
    return tsProj.src()
        .pipe(tsProj())
        .js
        .pipe(gulp.dest(paths.output.js))
});

gulp.task('watch-typescript', () => {
    return gulp.watch(paths.input.ts, (done) => {
        gulp.series(['clean', 'typescript'])(done);
    });
});

gulp.task('clean', () => {
    return del([
        'wwwroot/css/*',
        'wwwroot/js/*'
    ]);
});

gulp.task('default', gulp.series(['clean', 'sass', 'typescript']));
