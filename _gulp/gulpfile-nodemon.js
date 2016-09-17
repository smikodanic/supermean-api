var gulp = require('gulp');

//GULP Tasks
gulp.task('server-nodemon', require('./tasks/server-nodemon.js')());


//defult gulp task
gulp.task('default', ['nodemon-start']);
