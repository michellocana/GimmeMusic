const gulp 			= require('gulp');
const sass 			= require('gulp-sass');
const cleanCSS  	= require('gulp-clean-css');
const uglify 		= require('gulp-uglify');
const rename 		= require('gulp-rename');
const svgmin 		= require('gulp-svgmin');
const svgstore 		= require('gulp-svgstore');
const browserSync 	= require('browser-sync').create();
const reload      	= browserSync.reload;
 
gulp.task('minify-js', function() {
	return gulp.src(['src/js/*.js'])
		.pipe(uglify())        
		.pipe(rename({
			suffix: '.min'
		}))
		.on('error', err => console.log)
		.pipe(gulp.dest('dist/js/'));
});
 
gulp.task('sass', function () {
	gulp.src(['src/sass/**/*.sass'])
		.pipe(sass({
			indentType: 'tab',
			indentWidth: 1
		}).on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('svgmin', function(){
	gulp.src('src/img/*.svg', { base: 'src/img' })
		.pipe(svgmin())
		.pipe(svgstore({inlineSvg: true}))
		.pipe(gulp.dest('dist/img'));
});
 
gulp.task('default', () => {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('src/sass/**/*.sass', ['sass']);
	gulp.watch('src/js/*.js', ['minify-js']);
	gulp.watch('src/img/*.svg', ['svgmin']);
	gulp.watch("*").on("change", reload);
});