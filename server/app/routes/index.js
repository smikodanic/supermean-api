/**
 * ***** /server/app/routes/index.js
 * SuperMEAN root endpoints
 */
var config = require('../config');
var express = require('express');
var router = express.Router();
var timeLib = require('server/app/lib/timeLib.js');



/**
 * GET /
 * Main request which sends basic API info
 */
router.get('/', function (req, res) {
    'use strict';

    //get uptime
    var uptime = process.uptime();
    var uptime_human = timeLib.secondsToString(uptime);


    var jdata = {
        api: {
            name: config.api_name,
            url: config.env.url,
            environment: config.env.name,
            server: config.env.server
        },
        nodejs: {
            version: process.version,
            platform: process.platform,
            uptime: uptime,
            uptime_human: uptime_human
        },
        mongoose: {
            version:require('mongoose').version
        }
    };
    res.json(jdata);
});


module.exports = router;
