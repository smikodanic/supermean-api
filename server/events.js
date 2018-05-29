/**
 * Server events
 */

const chalk = require('chalk');



/**
 * Event listener for HTTP server "error" event.
 */
module.exports.onError = function (port) {
    'use strict';

    //onError callback function for server.on('error', onError);
    const onError = function (error) {

        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = (typeof port === 'string')
            ? 'Pipe ' + port
            : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            console.error(error);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(chalk.red(bind + ' is already in use'));
            process.exit(1);
            break;
        default:
            throw error;
        }
    };

    return onError;
};



/**
 * Event listener for HTTP server "listening" event.
 */
module.exports.onListening = function (server) {
    'use strict';

    //onError callback function for server.on('listening', onListening);
    const onListening = function () {
        const addr = server.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

        console.log(chalk.green('Listening on ' + bind));
    };

    return onListening;
};
