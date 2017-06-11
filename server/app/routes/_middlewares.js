/**
 * Common route middlewares.
 */
const passport = require('passport');
const chalk = require('chalk');
var config = require('server/app/config');
var log_access_model = require('server/app/models/log_access');

/** Passport auth middleware which will create req.user defined in /middlewares/auth/passportstrategy_jwt.js */
module.exports.authCheckPanel = passport.authenticate('jwt-panel', {
    successRedirect: '',
    // failureRedirect: '/examples/auth/passport/badauth',
    failureRedirect: '',
    failWithError: true, //send error as JSON instead of 'unauthorized' string
    failureFlash: false,
    session: false //this must be false because API must be stateless
});



/**
 * Middleware which allow access for only specific user's role.
 * @param  {Array} userRoles - ['admin', 'moderator']
 * @return {Function}         - middleware function
 */
module.exports.mustHaveRole = function (userRoles) {
    'use strict';
    return function (req, res, next) {
        if (userRoles.indexOf(req.user.role) !== -1) { //req.user comes from /middlewares/auth/passportstrategy_jwt.js
            next();
        } else {
            next(new Error('Role ' + req.user.role + ' doesn\'t have permission for this endpoint.'));
        }
    };
};


/**
 * Log route request to 'log_access' collection
 */
module.exports.log_access = function (req, res, next) {
    'use strict';

    if (!config.log_access) {//export NODE_LOG_ACCESS=false
        next();
        return;
    }

    //=-=-=-= insert into 'log_access' collection =-=-=-=
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    //if user is logged
    var user_id, user_role;
    if (req.user) {
        user_id = req.user._id;
        user_role = req.user.role;
    }

    var accessDoc = {
        status: 200,
        verb: req.method,
        url: fullUrl,
        user_id: user_id,
        user_role: user_role,
        ip: req.client.ip,
        time: moment()
    };

    //record to database
    log_access_model.insertLog(accessDoc)
        .catch(function (err) {
            err.category = 'log_access';
            next(err);
        });

    //output to console (only in dev environment)
    if (config.env.name === 'dev') {
        console.log(chalk.gray(JSON.stringify(accessDoc)));
    }


    next(); //go to next middleware

};