var timeLib = require('server/app/lib/timeLib.js');
var config = require('server/app/config');

module.exports.root = function (req, res) {
    'use strict';
    var jdata = {
        success: true
    };
    res.json(jdata);
};


module.exports.apiinfo = function (req, res) {
    'use strict';

    //get uptime
    var uptime = process.uptime();
    var uptime_human = timeLib.secondsToString(uptime);

    var jdata = {
        api: {
            name: config.api_name,
            version: 'v1',
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
            version: require('mongoose').version
        }
    };
    res.json(jdata);
};