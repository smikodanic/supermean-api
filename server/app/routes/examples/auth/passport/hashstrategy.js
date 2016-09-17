/**
 * /examples/auth/passport/hashstrategy-.*
 */

var passport = require('passport');
var users2_model = require('server/app/models/examples/users2');
var errorLib = require('server/app/lib/errorLib');

/* Passport auth middleware */
module.exports.auth = passport.authenticate('hash', {

    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false //this must be false

});


/**
GET /examples/auth/passport/hashstrategy
 */
module.exports.main = function (req, res) {
    'use strict';

    var jdata = {
        isSuccess: true,
        successMsg: 'Hash authentication was succcessfull.',
        apiData: {
            'req.user': req.user,
            'req.headers': req.headers,
            'req.rawHeaders': req.rawHeaders,
            req: require('util').inspect(req, {depth: 0})
        }
    };
    res.json(jdata);
};


/**
$ curl -X POST http://localhost:9005/examples/auth/passport/hashstrategy-gethash -d "username=john&pass=test"
POST /examples/auth/passport/hashstrategy-gethash
{
    "username": "john",
    "pass": "test"
}
 *
 * After successful login with username:pass takes hash_str from database and send it to client.
 */
module.exports.gethash = function (req, res) {
    'use strict';

    var username = req.body.username;
    var pass = req.body.password;

    users2_model.checkCredentials(username, pass)
        .then(function (userDoc) {
            var jdata = {
                isLoggedIn: true,
                msg: 'Login was successful. Now you can use hash to access API endpoints. For example: /examples/auth/passport/hashstrategy/' + userDoc.hash_str,
                putLocally: {
                    username: username,
                    hash: userDoc.hash_str
                }
            };

            res.json(jdata);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });


};


/**
GET /examples/auth/passport/hashstrategy/getsomedata
 */
module.exports.getsomedata = function (req, res) {
    'use strict';

    var jdata = {
        msg: 'This endpoint is protected by Hash Authentication.'
    };

    res.json(jdata);
};
