/**
 * /users/...
 */
const jwt = require('jsonwebtoken');
var users_model = require('server/app/models/users');
var config = require('server/app/config');


/**
 * Register user.
 * POST /users/register
{
    "first_name": "Marko",
    "last_name": "Marković",
    "address": "Radića 23",
    "city": "Osijek",
    "country": "Croatia",

    "phone": "+385-93-2111-222",
    "email": "test@uniapi.com",
    "website": "www.uniapi.org",

    "company": {
        "name": "Cloud jdoo",
        "address": "V . Nazora 47",
        "city": "Našice",
        "country": "Croatia",
        "email": "cloudjdoo@gmail.com"
    },

    "misc": {
        "facebook": "brvno"
    },

    "username": "marko",
    "password": "12345",

    "role": "admin"
}
 */
module.exports.register = function (req, res, next) {
    'use strict';

    var userDoc = req.body;

    /*** insert user into 'users' collection ***/
    users_model.register(userDoc)
        .then(function (insUser) {
            res.json({
                success: true,
                count: 1,
                message: 'User is created.',
                data: insUser
            });
        })
        .catch(function (err) {
            err.level = 'error';
            err.category = 'user';
            console.log(err.stack);
            next(err);
        });

};


/**
 * Login with username:password and respond with JWT token.
 * POST /users/login
{
    "username": "marko",
    "password": "12345"
}
 *
 * $ curl -X POST http://localhost:3011/uni/users/login -d "username=marko&pass=test"
 */
module.exports.login = function (req, res, next) {
    'use strict';

    var username = req.body.username;
    var password = req.body.password;

    users_model.login(username, password)
        .then(function (userDoc) {

            //generate token by JWT
            var jwt_payload = {id: userDoc._id, username: userDoc.username};
            var jwtToken = jwt.sign(jwt_payload, config.api_secret);

            var jdata = {
                isLoggedIn: true,
                msg: 'Login was successful. JWT Token is generated and you can use it in request header. Authorization: JWT ' + jwtToken,
                putLocally: {
                    username: userDoc.username,
                    authHeader: 'JWT ' + jwtToken
                }
            };

            res.json(jdata);
        })
        .catch(function (err) {
            err.level = 'error';
            err.category = 'user';
            next(err);
        });

};


/**
 * GET /users/info
 * Get logged user data (without password).
 */
module.exports.loggedinfo = function (req, res, next) {
    'use strict';

    var username = req.user.username; //comes from /server/app/middlewares/auth/passportstrategy_jwt.js

    var queryObj = {username: username};

    users_model.getUser(queryObj)
        .then(function (userDoc) {
            res.json(userDoc2);
        })
        .catch(function (err) {
            err.level = 'error';
            err.category = 'user';
            next(err);
        });
};