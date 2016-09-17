/**
 * Middleware for error handling
 */
var config = require('server/app/config');
var chalk = require('chalk');
var errorLib = require('server/app/lib/errorLib');


/* MAIN ERROR HANDLER
 * Sends formated error message as JSON response. */
module.exports.asJSON = function (err, req, res, next) {
    'use strict';

    if (config.env.name === 'dev') {
        console.log(chalk.red('APIerr: ' + err.message));
    }

    var jerr = errorLib.format2json(err);

    res.status(err.status || 500);
    res.json(jerr);
};
