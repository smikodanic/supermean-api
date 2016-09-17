var gulp = require('gulp');
var exec = require('child_process').exec;


module.exports = function (config) {
    'use strict';

    var app_name = config.app_name.replace(/\s/g, '-');

    console.log('Application name: ' + app_name);

    gulp.task('pm2-start', function () {
        exec('pm2 start server -n ' + app_name, function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('pm2 start server -n ' + app_name);
                console.log(stdout);
            }
        });
    });

    gulp.task('pm2-stop', function () {
        exec('pm2 stop server --silent -n ' + app_name, function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('pm2 stop server -n ' + app_name);
                console.log(stdout);
            }
        });
    });

    var i = 0; //restart iteration number
    gulp.task('pm2-restart', function () {
        exec('pm2 restart server -n ' + app_name, function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('(#' + i + ') pm2 restart server -n ' + app_name + '\n');
                i = i + 1;
                // console.log(stdout);
            }
        });
    });

    gulp.task('pm2-delete', function () {
        exec('pm2 delete server -n ' + app_name, function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('pm2 delete server -n ' + app_name);
                console.log(stdout);
            }
        });
    });

    gulp.task('pm2-deleteall', function () {
        exec('pm2 delete all', function (err, stdout) {
            if (err) {
                console.log(err);
            } else {
                console.log('pm2 delete all');
                console.log(stdout);
            }
        });
    });

};