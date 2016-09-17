/**
 * /examples/auth/passport/digeststrategy-.*
 */

var passport = require('passport');

//get headers sent from client
module.exports.getHeaders = function (req, res, next) {
    'use strict';
    console.log(JSON.stringify(req.headers, null, 2));
    next();
};

/* Passport auth middleware */
module.exports.auth = passport.authenticate('digest', {

    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false //this must be false

});


/**
GET /examples/auth/passport/digeststrategy
 */
module.exports.main = function (req, res, next) {
    'use strict';

    var jdata = {
        isLoggedIn: true,
        msg: 'Digest authentication was succcessfull.',
        putLocally: {
            username: req.user.username,
            authHeader: req.headers.authorization
        },
        apiData: {
            'req.user': req.user,
            'req.headers': req.headers,
            'req.rawHeaders': req.rawHeaders,
            req: require('util').inspect(req, {depth: 0})
        }
    };
    res.json(jdata);
};
