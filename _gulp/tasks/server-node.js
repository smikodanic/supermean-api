var gulp = require('gulp');
var exec = require('child_process').exec;


module.exports = function (config) {
    'use strict';

    var app_name = config.app_name.replace(/\s/g, '-');

    console.log('Application name: ' + app_name);

    gulp.task('node-start', function () {
        exec('node server', function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('SERVER STARTED with: node start');
                console.log(stdout);
            }
        });
    });

    gulp.task('node-stop', function () {
        process.exit();
        console.log('SERVER STOPPED');
    });

    gulp.task('node-restart', ['node-stop', 'node-start'], function () {
        console.log('SERVER RESTARTED');
    });

};