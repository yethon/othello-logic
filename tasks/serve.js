import gulp from 'gulp';
import runSequence from 'run-sequence';

// $ gulp serve
//    1. delete everything from the 'dist' folder
//    2. compile scss, concat css, minify css and copy it to 'dist' folder
//    3. run javascript through jshint, uglify and copy to 'dist' folder
//    4. copy static resources indext.html, then images
//    5. launch browsersync and serve out of the 'dist' folder
//    6. set up watchers - every change made inside the 'assets' folder will trigger all browsers to reload
//    7. BOOM! goes the dynamite (ie. launch the site in a browser)

gulp.task('serve', (callback) => {
  runSequence('build',
              'server',
              'watch',
              callback);
});
