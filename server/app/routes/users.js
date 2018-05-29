/**
 * /users/...
 */
const jwt = require('jsonwebtoken');
const users_model = require('server/app/models').users_model;
const config = require('server/app/config');


/**
 * POST /users/register
 * Register user with specific role (admin, customer, ...).
{
    "first_name": "Marko",
    "last_name": "Marković",
    "address": "Radića 23",
    "city": "Osijek",
    "country": "Croatia",

    "phone": "+385-93-2111-222",
    "email": "test@uniapi.com",
    "website": "www.uniapi.org",

    "username": "marko",
    "password": "test123",

    "role": "admin"
}
 */
module.exports.register = function (req, res, next) {
    'use strict';

    const userDoc = req.body;

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
            err.category = 'api';
            console.log(err);
            next(err);
        });

};



/**
 * POST /users/login
{
    "username": "marko",
    "password": "12345"
}
 * After successful login with username:password a JWT token is sent as response.
 */
module.exports.login = function (req, res, next) {
    'use strict';

    const username = req.body.username;
    const password = req.body.password;

    users_model.login(username, password)
        .then(function (userDoc) {

            //generate token by JWT
            const jwt_payload = {id: userDoc._id, username: userDoc.username};
            const jwtToken = jwt.sign(jwt_payload, config.api_secret);

            //update jwt_token which will be used for node-cron & socket.io authentication
            return users_model.editOne({_id: userDoc._id}, {jwt_token: jwtToken})
                .then(function () {
                    const jdata = {
                        success: true,
                        message: 'Login was successful. JWT is generated and you can use it in API request header. Authorization: JWT ' + jwtToken,
                        browser_storage: {
                            username: userDoc.username,
                            authorization_header: 'JWT ' + jwtToken
                        }
                    };
                    res.json(jdata);
                });

        })
        .catch(function (err) {
            err.category = 'api';
            next(err);
        });
};



/**
 * GET /users/loggedinfo
 * Authorization: JWT xyz...
 * Get logged user data (without password). User must be logged.
 */
module.exports.loggedinfo = function (req, res, next) {
    'use strict';

    const username = req.user.username; //comes from /server/app/middlewares/auth/passportstrategy_jwt.js

    const queryObj = {username: username};

    users_model.getOne(queryObj)
        .then(function (userDoc) {
            res.json(userDoc);
        })
        .catch(function (err) {
            err.category = 'api';
            next(err);
        });
};

