const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');

const paths = {
  styles: {
    src: 'src/less/**/*.less',
    dest: 'public/css/'
  }
};

function clean() {
  return del(['public/css']);
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

const build = gulp.series(clean, styles);

gulp.task('default', build);