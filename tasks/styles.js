import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import concatCss from 'gulp-concat-css';
import browserSync from 'browser-sync';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';

// compile scss files, add prefixes if applicable, and concat all subsequent css
// minify css and copy to 'dist' folder
gulp.task('styles', () => {
  return gulp.src(['assets/styles/**.css', 'assets/styles/**.scss'])
    .pipe(sass())
    .pipe(autoprefixer( {
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(concatCss('site.min.css'))
    .pipe(cleanCSS({debug: true}))
    .pipe(gulp.dest('./dist/assets'))
    .pipe(browserSync.stream());
});
