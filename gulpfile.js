const gulp = require('gulp');
const sass = require('node-sass');
const inlineTemplates = require('gulp-inline-ng2-template');
const exec = require('child_process').exec;
const htmlMinifier = require("html-minifier");/*!!!!*/
const copyfiles = require('copyfiles');
const cssimport = require("gulp-cssimport");
const replace = require('gulp-replace');

const SCSS_CONF = {
  SRC: './styles.scss',
  DIST: './dist'
};

gulp.task('datatables.styles', (callback) => {
  return gulp.src(SCSS_CONF.SRC)
    .pipe(cssimport({}))
    .pipe(gulp.dest(SCSS_CONF.DIST));
});

const FILES = [
  'CHANGELOG.md',
  'LICENSE',
  'README.md',
  'package.json',
  '.npmignore',
  'dist'
];

gulp.task('copy-files', ['copy-table-files', 'copy-table-theme'], (callback) => {
  copyfiles(FILES, true, callback);
});

gulp.task('copy-table-files', (callback) => {
  copyfiles(['src/components/table/vendor/**/*', 'dist/src/components/'], 2, callback);
});

gulp.task('copy-table-theme', (callback) => {
  copyfiles(['src/components/table/o-datatable-theme.scss', 'dist'], true, callback);
});

gulp.task('copy-table-files-tmp', (callback) => {
  copyfiles(['src/components/table/vendor/**/*', 'tmp/src/components/'], 2, callback);
});

/**
 * Inline templates configuration.
 * @see  https://github.com/ludohenin/gulp-inline-ng2-template
 */
const INLINE_TEMPLATES_CONF = {
  SRC: ['./**/*.ts', '!./tmp/**/*', '!./node_modules/**/*', '!./custom-typings.d.ts'],
  DIST: './tmp',
  CONFIG: {
    base: '.',
    target: 'es6',
    useRelativePaths: true,
    styleProcessor: compileSass
  }
};

/**
 * Inline external HTML and SCSS templates into Angular component files.
 * @see: https://github.com/ludohenin/gulp-inline-ng2-template
 */
gulp.task('inline-templates', () => {
  return gulp.src(INLINE_TEMPLATES_CONF.SRC)
    .pipe(inlineTemplates(INLINE_TEMPLATES_CONF.CONFIG))
    .pipe(gulp.dest(INLINE_TEMPLATES_CONF.DIST));
});

/**
 * Compile SASS to CSS.
 * @see https://github.com/ludohenin/gulp-inline-ng2-template
 * @see https://github.com/sass/node-sass
 */
function compileSass(path, ext, file, callback) {
  let compiledCss = sass.renderSync({
    file: path,
    outputStyle: 'compressed',
  });
  callback(null, compiledCss.css);
}
