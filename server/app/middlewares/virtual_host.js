/**
 * Virtual host (if you don't want to use nGinx as reverse proxy)
 * https://www.npmjs.com/package/vhost
 */

var vhost = require('vhost');


module.exports = function (app, config) {
    'use strict';

    // define virtual host (http://www.nodeigniterjs.loc:3000)
    if (config.env.server.virtualHost) {
        app.use(vhost(config.env.server.domain, app));
        console.log('Virtual host activated. ' + config.env.server.domain + ':' + config.env.server.port);
    } else {
        console.log('Virtual host deactivated. ' + '127.0.0.1:' + config.env.server.port);
    }
};