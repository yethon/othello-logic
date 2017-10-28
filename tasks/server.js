import gulp from 'gulp';
import browserSync from 'browser-sync';

// launch a browser and serve the site from 'dist' folder
gulp.task('server', () => {
  browserSync.init({
    server: './dist'
  });
});
