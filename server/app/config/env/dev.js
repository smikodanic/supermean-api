/**
 ***** development environment
 * gulpFile: gulpfile-nodemon.js || gulpfile-pm2.js
 */


const config = {

    url: 'http://api-dev.supermean.org',
    name: 'dev',
    server: {
        virtualHost: false,
        domain: 'api-dev.supermean.org',
        port: process.env.PORT || 9011
    },
    gulpFile: 'gulpfile-nodemon.js',
    mongodb: {
        enabled: true,
        uri: process.env.MONGODB_URI || 'mongodb://supermean_user:12345@5.189.161.70:27017/supermean',
        driver: 'mongoose'
    }

};

module.exports = config;
