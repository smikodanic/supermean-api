/**
 ***** development environment
 * gulpFile: gulpfile-nodemon.js || gulpfile-pm2.js
 */

const config = {

    url: 'http://api.supermean.org',
    name: 'dev',
    server: {
        virtualHost: false,
        domain: 'api.supermean.org',
        port: process.env.PORT || 9010
    },
    gulpFile: 'gulpfile-nodemon.js',
    mongodb: {
        enabled: true,
        uri: process.env.MONGODB_URI || 'mongodb://supermean_user:xxxxx@5.189.161.70:27017/supermean',
        driver: 'mongoose'
    }

};

module.exports = config;
