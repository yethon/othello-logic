import gulp from 'gulp';
import runSequence from 'run-sequence';

// 'dist' contains the latest minifined and uglified build
// your site is always ready to be deployed
gulp.task('build', (callback) => {
  runSequence('clean',
             ['styles', 'copy-index', 'scripts'],
              'copy-images',
              callback);
});
