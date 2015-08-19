var browserSync = require('browser-sync');
var converter = require('sass-convert');
var cp = require('child_process');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var prefix = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var vfs = require('vinyl-fs');

var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Convert sass to scss for linting
gulp.task('sass-convert', function() {
  vfs.src('assets/css/2-modules/*.sass')
    .pipe(converter({
      from: 'sass',
      to: 'scss',
      rename: true
    }))
    .pipe(vfs.dest('assets/scss'));
});

// Minify images
gulp.task('imagemin', function() {
  return gulp.src('assets/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('_site/assets/img'));
});

// Build the Jekyll Site
gulp.task('jekyll-build', function(done) {
  browserSync.notify(messages.jekyllBuild);
  return cp.spawn('jekyll', ['build'], {
      stdio: 'inherit'
    })
    .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
  browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'jekyll-build'], function() {
  browserSync({
    server: {
      baseDir: '_site'
    }
    // notify: false
  });
});

// Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
gulp.task('sass', function() {
  return gulp.src('assets/css/main.scss')
    .pipe(sass({
      includePaths: ['css'],
      onError: browserSync.notify
    }))
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('assets/css'));
});

// Watch scss files for changes & recompile
// Watch html/md files, run jekyll & reload BrowserSync
// Watch sass files & convert to scss
// Watch image files and minify
gulp.task('watch', function() {
  gulp.watch('assets/css/**', ['sass']);
  gulp.watch('assets/js/**', ['jekyll-rebuild']);
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*'], ['jekyll-rebuild']);
  gulp.watch('assets/css/2-modules/**', ['sass-convert']);
  gulp.watch('assets/img/**', ['imagemin']);
});

// Default task, running just `gulp` will compile the sass,
// compile the jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch'], function() {
});
