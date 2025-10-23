const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const zip = require('gulp-zip');

gulp.task('build:icons', function () {
  return gulp
    .src('icons/*.svg')
    .pipe(
      svgmin({
        plugins: [
          {
            name: 'removeViewBox',
            active: false,
          },
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [
                {
                  fill: 'currentColor',
                },
              ],
            },
          },
        ],
      })
    )
    .pipe(gulp.dest('dist/icons'));
});

gulp.task('default', gulp.series('build:icons'));