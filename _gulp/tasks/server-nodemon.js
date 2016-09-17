var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

module.exports = function () {
    'use strict';

    gulp.task('nodemon-start', function () {
        return nodemon({
            script: 'server',
            ext: 'js json html',
            ignore: [
                'README.md',
                'node_modules/**',
                'server/tmp/**',
                '.gulp/**',
                '.*/**'
            ],
            delayTime: 10,
            env: {
                NODE_ENV: process.env.NODE_ENV || 'dev'
            }
        }).on('restart', ['']);
    });

};
