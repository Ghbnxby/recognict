var gulp = require('gulp');
  var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var connect = require('connect');
var serveStatic = require('serve-static');

function compile(watch) {
  var bundler = watchify(browserify('./src/app/app.js', { standalone: "RecognictModule",debug: true }).transform(babel, { stage: 0 }));
  var version = 0;

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'));
    console.log('Rebuild version: ' + version);
    version = version + 1;
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  return compile(true);
};

gulp.task('http-server', function() {
  connect()
    .use(serveStatic('./src/www', {extensions: ['json']}))
    .use(serveStatic('./build'))
    .listen('3000');
});

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch', 'http-server']);