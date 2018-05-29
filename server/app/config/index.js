/*
 * API configuration file
 *
 * Switch environment (default is dev):
 * $export NODE_ENV=dev || $export NODE_ENV=prod
 */

const config_env = require('./env/' + (process.env.NODE_ENV || 'dev'));

//$export NODE_RIND=true  (will rebuild all mongoose indexes)
let node_rind = false;
if (process.env.NODE_RIND) {
    node_rind = JSON.parse(process.env.NODE_RIND);
}

//$export NODE_LOG_ERRORS=true  (will record all errors to 'log_errors' mongo collection)
let node_log_errors = false;
if (process.env.NODE_LOG_ERRORS) {
    node_log_errors = JSON.parse(process.env.NODE_LOG_ERRORS);
}

//$export NODE_LOG_ACCESS=true  (will record all access to 'log_access' mongo collection)
let node_log_access = false;
if (process.env.NODE_LOG_ACCESS) {
    node_log_access = JSON.parse(process.env.NODE_LOG_ACCESS);
}



const config = {
    api_name: 'SuperMEAN API',
    api_key: '12345678',
    api_secret: 'xztR!555&tr_kč',
    env: config_env,

    rebuildIndexes: node_rind,
    log_errors: node_log_errors,
    log_access: node_log_access
};

module.exports = config;
