const browserify = require("browserify");
const gulp = require("gulp");
const { series } = require("gulp");
const terser = require("gulp-terser");
const rename = require("gulp-rename");
const source = require("vinyl-source-stream");

gulp.task("build", function () {
  return browserify("src/index.js", {
    standalone: "cw",
  })
    .bundle()
    .pipe(source("cw.js"))
    .pipe(gulp.dest("dist/"));
});

gulp.task("terse", function () {
  return gulp
    .src("dist/cw.js")
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("dist/"));
});

exports.default = series("build", "terse");
