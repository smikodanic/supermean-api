/**
 * /examples/auth/passport/.*
 */


 /* GET /examples/auth/passport/ */
module.exports.main = function (req, res) {
    'use strict';

    var jdata = {
        title: 'API Authentication Examples - PassportJS'
    };

    res.json(jdata);
};


 /* GET /examples/auth/passport/badauth
  * Each bad authorization request is redirected to this route. */
module.exports.badauth = function (req, res) {
    'use strict';

    var jdata = {
        status: 401,
        statusMsg: 'The request is not authenticated.'
    };

    res.status(401).json(jdata);
};
