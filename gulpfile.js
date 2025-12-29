const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");

// JS Paths
const jsPaths = {
  src: ["./src/*.js"],
  output: "./dist/",
};

// Gulp task to concatenate and minify JS
function scripts() {
  return (
    gulp
      .src(jsPaths.src, { sourcemaps: true })
      // Combine all JS files into one
      .pipe(concat("carnationpoints.js"))
      // Output normal (unminified) version
      .pipe(gulp.dest(jsPaths.output))
      // Then minify it
      .pipe(uglify())
      // Rename to .min.js
      .pipe(rename({ suffix: ".min" }))
      // Output minified version
      .pipe(gulp.dest(jsPaths.output))
  );
}

// Watch task
function watchFiles() {
  gulp.watch(jsPaths.src, scripts);
}

// Export tasks
exports.scripts = scripts;
exports.watchFiles = watchFiles;
exports.default = gulp.series(scripts);
