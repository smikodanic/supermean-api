/**
 * /examples/auth/.*
 */


/* GET /examples/auth/ */
module.exports.main = function (req, res, next) {
    'use strict';
    var jdata = {
        title: 'API Authentication Examples'
    };

    res.json(jdata);
}
