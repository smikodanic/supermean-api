/**
 * Main server file
 */

const config = require('./app/config');
const app = require('./app/_app');
const port = config.env.server.port;


//create HTTP server
const server = require('http').createServer(app);
server.listen(port);


//server events
server.on('error', require('./events').onError(port));
server.on('listening', require('./events').onListening(server));
