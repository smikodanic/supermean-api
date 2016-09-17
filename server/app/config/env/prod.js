/**
 ***** production environment
 * gulpFile: gulpfile-nodemon.js || gulpfile-pm2.js
 */
var config = {

    url: 'http://api.supermean.org',
    name: 'prod',
    server: {
        virtualHost: false,
        domain: 'api.supermean.loc',
        port: process.env.PORT || 9001
    },
    gulpFile: 'gulpfile-nodemon.js',
    database: {
        mongodb: [ //first in the list is default server and will be started on nodejs startup
            {
                name: 'supermean',
                isActive: true, //true || false (if false then app will not use this mongodb)
                uri: process.env.MONGODB_URI_1 || 'mongodb://supermean_user:smPass@127.0.0.1:27017/supermean',
                driver: 'mongoose'
            },
            {
                name: 'supermean2',
                isActive: true,
                uri: process.env.MONGODB_URI_2 || 'mongodb://supermean_user:somePass@127.0.0.1:27017/supermean',
                driver: 'mongoose'
            }
        ]

    }

};

module.exports = config;
