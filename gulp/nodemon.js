var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

gulp.task('nodemon', ['watch-app'], function() {
   // livereload.listen();
  nodemon({
    script: 'index.js',
    ext: 'js html css',
    ignore: ['public/app/**/*.js', 'public/app/**/*.css', 'gulp', 'test']
  }).on('restart', function(){
    console.log('server restart');
     // livereload.reload();
  })
})