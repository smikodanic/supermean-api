/**
 * PassportJS authentication middleware
 * DIGEST STRATEGY
 * http://passportjs.org/docs/basic-digest
 *
 * $npm install --save passport-http
 *
 * The digest strategy is different than basic in that it uses a special challenge-response paradigm so as to
 * avoid sending the password in cleartext. This strategy would be a good solution when SSL/TLS wouldn't be available.
 *
 *
 */
var passport = require('passport');
var DigestStrategy = require('passport-http').DigestStrategy;
var users_model = require('server/app/models/users');
var authLib = require('server/app/lib/authLib');

module.exports = function () {
    'use strict';

    passport.use(new DigestStrategy(

        //options
        {
            realm: 'superrealm', //default 'Users'
            // domain: '/examples/auth/passport',
            algorithm: 'MD5', //default 'MD5'
            qop: 'auth' //default 'auth' , 'auth-int'
        },

        //first callback
        function (username, done) {

            users_model.getByUsername(username)
                .then(function (userDoc) {

                    //if username doesn't exist
                    if (!userDoc) {
                        var err = new Error('bad username');
                        err.status = 401;
                        return done(err, false);
                    }

                    //decoding password from DB (gives original password)
                    var pass = authLib.base64ToStr(userDoc.pass);
                    // var pass = authLib.decrypt(userDoc.pass);
                    console.log(pass);

                    //var 'userDoc' is transfered into req.user and can be used in controller req.user, where req.user = userDoc
                    return done(null, userDoc, pass);

                })
                .catch(function (err) {
                    return done(err);
                });

        },

        //second callback
        function (params, done) {
            // console.log('PARAMS: ', params);
            /*
            {
                nonce: 'PAaXuPotGbRlYRzgqv39vXlfIJw0JKoc',
                cnonce: undefined,
                nc: undefined,
                opaque: undefined
            }
             */
            return done(null, true);
        }
    ));



};
