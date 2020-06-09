const browserify = require("browserify");
const gulp = require("gulp");
var source = require("vinyl-source-stream");

gulp.task("build", function () {
  return browserify("src/index.js", {
    standalone: "cw",
  })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("examples/"));
});
