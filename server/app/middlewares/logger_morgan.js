/**
 * Morgan HTTP request logger
 * https://github.com/expressjs/morgan
 */

const morgan = require('morgan');

module.exports = function (app, config) {
    'use strict';

    // log every request to the console (works only when NODE_ENV=dev)
    if (config.env.name === 'dev') {
        app.use(morgan('dev'));
    }

};
