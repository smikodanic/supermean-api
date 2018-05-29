/**
 * Get client IP address.
 */
const requestIp = require('request-ip');

module.exports = function (req, res, next) {
    'use strict';
    req.client.ip = requestIp.getClientIp(req);
    next();
};