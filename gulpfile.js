const { src, dest, series } = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const plumber = require("gulp-plumber");

function scripts() {
  return src("src/**/*.js")
    .pipe(plumber()) // prevent crash on errors
    .pipe(concat("carnationpoints.js")) // normal file
    .pipe(dest("dist")) // dist/carnationpoints.js
    .pipe(rename({ suffix: ".min" })) // rename to .min.js
    .pipe(uglify()) // minify
    .pipe(dest("dist")); // dist/carnationpoints.min.js
}

exports.build = series(scripts);
exports.default = series(scripts);
  