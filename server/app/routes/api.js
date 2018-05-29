const timeLib = require('server/app/lib/timeLib.js');
const config = require('server/app/config');

module.exports.root = function (req, res) {
    'use strict';
    const jdata = {
        success: true
    };
    res.json(jdata);
};


module.exports.apiinfo = function (req, res) {
    'use strict';

    //get uptime
    const uptime = process.uptime();
    const uptime_human = timeLib.secondsToString(uptime);

    const jdata = {
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
        },
        socket_io: {
            version: require('socket.io/package').version
        },
        client: {
            ip: req.client.ip,
            headers: req.headers,
            body: req.body,
            params: req.params,
            query: req.query
        }
    };
    res.json(jdata);
};