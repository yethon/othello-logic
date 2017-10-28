import gulp   from 'gulp';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import babel  from 'gulp-babel';
import pump from 'pump';

gulp.task('scripts', (cb) => {
  pump([
    gulp.src(['assets/js/**.js', '!node_modules/**']),
    eslint(),
    eslint.format(),
    concat('site.js'),
    babel({
      presets: ['env']
    }),
    uglify(),
    gulp.dest('./dist/assets/js')
  ], cb);
});
