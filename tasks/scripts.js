import gulp   from 'gulp';
import eslint from 'gulp-eslint';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import babel  from 'gulp-babel';
import pump from 'pump';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('scripts', (cb) => {
  pump([
    gulp.src(['assets/js/**.js', '!node_modules/**']),
    sourcemaps.init(),
    eslint(),
    eslint.format(),
    concat('site.js'),
    babel({
      presets: ['env']
    }),
    uglify(),
    sourcemaps.write('maps'),
    gulp.dest('./dist/assets/js')
  ], cb);
});
