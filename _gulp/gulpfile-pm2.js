var gulp = require('gulp');
var config = require('../server/app/config');

//GULP Tasks
gulp.task('on-ctrl-c', require('./tasks/on-ctrl-c.js')(gulp));
gulp.task('server-pm2', require('./tasks/server-pm2.js')(config));


gulp.task('default', ['on-ctrl-c'], function () {
    'use strict';
    gulp.start('pm2-start');
});
