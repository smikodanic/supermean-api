/*
 * API configuration file
 *
 * Switch environment (default is dev):
 * $export NODE_ENV=dev || $export NODE_ENV=prod
 */

var config_env = require('./env/' + (process.env.NODE_ENV || 'dev'));

var config = {
    api_name: 'SuperMEAN API',
    api_key: '12345678',
    api_secret: 'xztR!25&tr_kč',
    env: config_env
};

module.exports = config;
