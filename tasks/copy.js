import gulp from 'gulp';

// copy static assets into the 'dist' folder
gulp.task('copy-images', () => {
  return gulp.src('assets/img/**.*')
    .pipe(gulp.dest('./dist/assets/img'));
});

gulp.task('copy-index', () => {
  return gulp.src('index.html')
    .pipe(gulp.dest('./dist'));
});
