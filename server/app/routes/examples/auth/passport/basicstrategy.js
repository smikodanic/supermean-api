/**
 * /examples/auth/passport/basicstrategy-.*
 */

var passport = require('passport');

/* Passport auth middleware */
module.exports.auth = passport.authenticate('basic', {

    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false, //this must be false
    failWithError: true //send error as JSON instead of 'unauthorized' string

});


/**
GET /examples/auth/passport/basicstrategy
 */
module.exports.main = function (req, res) {
    'use strict';

    var jdata = {
        isLoggedIn: true,
        msg: 'Basic authentication was succcessfull.',
        putLocally: {
            username: req.user.username,
            authHeader: req.headers.authorization
        },
        miscApiData: {
            'req.user': req.user,
            'req.headers': req.headers,
            'req.rawHeaders': req.rawHeaders,
            req: require('util').inspect(req, {depth: 0})
        }
    };
    res.json(jdata);
};


/**
GET /examples/auth/passport/basicstrategy/getsomedata
 */
module.exports.getsomedata = function (req, res) {
    'use strict';

    var jdata = {
        msg: 'This endpoint is protected by Basic Authentication.'
    };

    res.json(jdata);
};
