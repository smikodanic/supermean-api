/**
 * Debugging middleware
 * Start server with: DEBUG=api:index.js node server
 */

var debug = require('debug')('api:index.js');
var chalk = require('chalk');


module.exports = function (app, config) {
    'use strict';

    debug(chalk.green('env variable: NODE_ENV=' + config.env.name));
    debug(chalk.yellow(__dirname));

    app.use(function (req, res, next) {
        debug(chalk.blue('params:' + req.params + ' body:' + req.body + ' query:' + req.query));
        next();
    });
};
