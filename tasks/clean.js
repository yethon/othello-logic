import gulp from 'gulp';
import del from 'del';

// delete everything in the 'dist' folder
gulp.task('clean', () => {
  return del(['./dist/**'], {force: true});
});
