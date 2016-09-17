/**
 * PassportJS authentication middleware
 * BASIC STRATEGY
 * http://passportjs.org/docs/basic-digest
 *
 * $npm install --save passport-http
 *
 * The Basic strategy implemented by Passport looks nearly identical to the local strategy, with one subtle difference.
 * The basic strategy is to be used with API endpoints where the architecture is stateless. As a result,
 * sessions are not required but can be used. This strategy should also use SSL/TLS because password is transfered as plaintext.
 *
 * Steps:
 * 1. The client makes a request for information, sending a username and password to the server in plain text
 * 2. username:password pair is Base64 encoded during transporttation to server what is visible in header (Authorization: Basic am9objp0ZXN0)
 * 3. Server receives and decode username:password (am9objp0ZXN0 ==> john:test)
 *  https://www.base64decode.org/
 * 4. username and passwords are compared with username and password from database
 * 5. If compared data is OK the API resource is transfered.
 *
 */
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var users_model = require('server/app/models/examples/users1');
var authLib = require('server/app/lib/authLib');



module.exports = function () {
    'use strict';

    passport.use(new BasicStrategy(
        function (username, password, done) {

            users_model.getByUsername(username)
                .then(function (userDoc) {
                    // console.log('username-pass:' + username + '-' + password);
                    // console.log(JSON.stringify(userDoc, null, 2));

                    var err;

                    //if username doesn't exist
                    if (!userDoc) {
                        err = new Error('bad username');
                        err.status = 401;
                        return done(err, false);
                    }

                    //if password is not correct
                    if (authLib.strToSha256(password, userDoc.username, 21) !== userDoc.pass) {
                        err = new Error('bad password');
                        err.status = 401;
                        return done(err, false);
                    }

                    // var 'userDoc' is transfered into req.user and can be used in controller req.user, where req.user = userDoc
                    return done(null, userDoc);

                })
                .catch(function (err) {
                    return done(err);
                });

        }
    ));



};
