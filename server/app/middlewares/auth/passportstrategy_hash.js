/**
 * PassportJS authentication middleware
 * Hash STRATEGY
 * https://github.com/yuri-karadzhov/passport-hash
 *
 * $npm install --save passport-hash
 *
 * Principles:
 * 1. Api client try to login with username:pass and if login is successful client receives hash stored in database
 *     (POST /examples/auth/passport/hashstrategy-gethash)
 * 2. Hash is generated with one-direction sha256 from username and password, so username and passwords can't be get back from hashed string.
 * 3. Add hash at the end of URL: GET /examples/auth/passport/hashstrategy/0abc12df345
 * 4. Notice that :hash must be used when defining a route: router.get('/hashstrategy/:hash', hashstrategy.auth, hashstrategy.main);

 *
 * The advantage is because protected API endpoints can be accesed by links. For example in emails, chats ...etc.
 * <a href="/examples/auth/passport/hashstrategy/0abc12df345">protected api endpoint</a>
 */
var passport = require('passport');
var HashStrategy = require('passport-hash').Strategy;
var users_model = require('server/app/models/examples/users2');


module.exports = function () {
    'use strict';

    passport.use(new HashStrategy(function (hash, done) {

        users_model.getUserByHash(hash)
            .then(function (userDoc) {

                //if user is not found
                if (!userDoc) {
                    var err = new Error('Forbidden access. Bad hash: ' + hash);
                    err.status = 403;
                    return done(err, false);
                }

                /* var 'userDoc' is transfered into req.user and can be used in controller req.user */
                return done(null, userDoc);

            })
            .catch(function (err) {
                return done(err);
            });

    }));



};
