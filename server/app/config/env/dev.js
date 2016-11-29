/**
 ***** development environment
 * gulpFile: gulpfile-nodemon.js || gulpfile-pm2.js
 */
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
                // uri: process.env.MONGODB_URI_1 || 'mongodb://supermean_user:smPass@127.0.0.1:27017/supermeandev',
                uri: process.env.MONGODB_URI_1 || 'mongodb://supermean_user:smPass@5.189.161.70:27017/supermean',
                driver: 'mongoose'
            },
            {
                name: 'supermeandev2',
                isActive: false,
                // uri: process.env.MONGODB_URI_2 || 'mongodb://supermean_user:somePass@127.0.0.1:27017/supermeandev2',
                uri: process.env.MONGODB_URI_2 || 'mongodb://supermean_user:somePass@5.189.161.70:27017/supermean2',
                driver: 'mongoose'
            }
        ]

    }

};

module.exports = config;
