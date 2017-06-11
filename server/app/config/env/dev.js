/**
 ***** development environment
 * gulpFile: gulpfile-nodemon.js || gulpfile-pm2.js
 */

//$export NODE_RIND=true  (will rebuild all mongoose indexes)
var node_rind = false;
if (process.env.NODE_RIND) {
    node_rind = JSON.parse(process.env.NODE_RIND);
}

var config = {

    url: 'http://api.dev.supermean.org',
    name: 'dev',
    server: {
        virtualHost: false,
        domain: 'api.dev.supermean.loc',
        port: process.env.PORT || 9005
    },
    gulpFile: 'gulpfile-nodemon.js',
    database: {
        mongodb: [ //first in the list is default server and will be started on nodejs startup
            {
                name: 'supermeandev',
                isActive: true, //true || false (if false then app will not use this mongodb)
                uri: process.env.MONGODB_URI_1 || 'mongodb://supermean_user:test@127.0.0.1:27017/supermean-dev',
                driver: 'mongoose'
            },
            {
                name: 'supermeandev2',
                isActive: false,
                uri: process.env.MONGODB_URI_2 || 'mongodb://supermean_user:test@127.0.0.1:27017/supermean-dev2',
                driver: 'mongoose'
            }
        ]

    }

};

module.exports = config;
