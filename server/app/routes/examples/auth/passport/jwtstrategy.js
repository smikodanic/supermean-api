/**
 * /examples/auth/passport/jwtstrategy-.*
 */

var passport = require('passport');
var users2_model = require('server/app/models/examples/users2');
var errorLib = require('server/app/lib/errorLib');
var jwt = require('jsonwebtoken');
var config = require('server/app/config');


/* Passport auth middleware */
module.exports.auth = passport.authenticate('jwt', {

    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false //this must be false

});




/**
$ curl -X POST http://localhost:9005/examples/auth/passport/jwtstrategy-gettoken -d "username=john&pass=test"
POST /examples/auth/passport/jwtstrategy-gettoken
{
    "username": "john",
    "password": "test"
}
 *
 * Send token to the client after successful login with username:pass
 */
module.exports.gettoken = function (req, res) {
    'use strict';

    var username = req.body.username;
    var pass = req.body.password;

    users2_model.checkCredentials(username, pass)
        .then(function (userDoc) {
            //generate token by jwt
            var jwtToken = jwt.sign({id: userDoc._id}, config.api_secret);

            var jdata = {
                isLoggedIn: true,
                msg: 'Login was successful. JWT Token is generated and you can use it in request header to access API. Authorization: JWT ' + jwtToken,
                putLocally: {
                    username: userDoc.username,
                    authHeader: 'JWT ' + jwtToken
                }
            };

            res.json(jdata);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });


};



/**
GET /examples/auth/passport/jwtstrategy
 */
module.exports.main = function (req, res) {
    'use strict';

    var jdata = {
        status: 200,
        successMsg: 'JWT authentication was succcessfull.',
        miscApiData: {
            'req.user': req.user,
            'req.headers': req.headers,
            'req.rawHeaders': req.rawHeaders,
            req: require('util').inspect(req, {depth: 0})
        }
    };
    res.json(jdata);
};



//get headers sent from client
module.exports.getHeaders = function (req, res, next) {
    'use strict';
    console.log(JSON.stringify(req.headers, null, 2));
    next();
};


/**
GET /examples/auth/passport/jwtstrategy/getsomedata
 */
module.exports.getsomedata = function (req, res) {
    'use strict';

    var jdata = {
        msg: 'This endpoint is protected by JWT Authentication.'
    };

    res.json(jdata);
};

