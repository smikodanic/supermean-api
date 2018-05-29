/**
 * Middleware for error manipulation.
 */
const config = require('server/app/config');
const chalk = require('chalk');
const moment = require('moment');

const log_errors_model = require('server/app/models/log_errors');
const log_access_model = require('server/app/models/log_access');


/**
 * Convert error to JSON and send formatted error to client.
 * @param  {Error} err - non formatted error
 * @return {Object}     - JSON formatted error message
 */
const send2client = function (err, res) {
    'use strict';

    //object which will be sent
    const jsonErr = {
        status: err.status || 500,
        message: err.message,
        stack: err.stack,
        err: err
    };

    //Make mongoose 'unique' errors human readable
    if (jsonErr.message.indexOf('E11000') !== -1) {
        // const fieldName = jsonErr.message.match(/\$(.+) dup/g)[0]; //old mongoose
        let fieldName = jsonErr.message.match(/index: (.+) dup/g)[0];
        // fieldName = fieldName.replace('$ ', ''); //old mongoose
        fieldName = fieldName.replace('index: ', '');
        fieldName = fieldName.replace(' dup', '');
        jsonErr.message = 'This ' + fieldName + ' is already used.';
    }

    //send error to client in JSON notation
    res.status(jsonErr.status).json(jsonErr);
};


/**
 * Insert error to 'log_errors' collection
 * @param  {Error}   errDoc - error document object
 * @param  {Function} next
 * @return null
 */
const send2mongo = function (err, req, next) {
    'use strict';

    if (!config.log_errors) {//export NODE_LOG_ERRORS=false
        return;
    }

    //full url
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    const errDoc = {
        status: err.status || 500,
        level: err.level || 'error',
        category: err.category || 'general',
        message: err.message,
        stack: err.stack,
        verb: req.method,
        url: fullUrl,
        ip: req.client.ip,
        time: moment(),
        err_orig: err || {} //original error
    };

    //user property
    if (req.user) { //when user is logged in panel
        errDoc.user = {
            id: req.user._id,
            username: req.user.username,
            email: req.user.email,
            role: req.user.role
        };
    } else { //when endpoint is using x-uniapi-key header
        errDoc.user = {
            id: '',
            username: '',
            email: '',
            role: ''
        };
    }


    log_errors_model.insertLog(errDoc)
        .catch(function (err) {
            err.category = 'log_errors';
            next(err);
        });
};


const send2console = function (err) {
    'use strict';
    //output to console (only in dev environment)
    if (config.env.name === 'dev') {
        console.log(chalk.red(err.stack));
        console.log(chalk.magenta(JSON.stringify(err, null, 4)));
    }
};



module.exports.sender = function (err, req, res, next) {
    'use strict';

    /*** OUTPUT ***/
    send2client(err, res);
    send2console(err);
    send2mongo(err, req, next);
};




/* report error 404: Page not found!*/
module.exports.badurl = function (req, res, next) {
    'use strict';

    const jErr = {
        status: 404,
        message: 'Error 404: URL not found!',
        endpoint: req.method + ' ' + req.url
    };

    res.status(404).json(jErr);


    //=-=-=-= insert into 'log_access' collection =-=-=-=
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    let user_id, user_role;
    if (req.user) {
        user_id = req.user._id;
        user_role = req.user.role;
    }

    const accessDoc = {
        status: 404,
        verb: req.method,
        url: fullUrl,
        user_id: user_id,
        user_role: user_role,
        ip: req.client.ip,
        time: moment()
    };

    log_access_model.insertLog(accessDoc)
        .catch(function (err) {
            err.category = 'log_access';
            next(err);
        });

};


//catch all uncaught exceptions
module.exports.uncaught = function () {
    'use strict';

    process.on('uncaughtException', function (err) {

        //insert to mongodb
        const errDoc = {
            status: 500,
            level: 'error',
            category: 'uncaught',
            message: err.message,
            stack: err.stack,
            time: moment(),
            err_orig: err || {} //original error
        };

        log_errors_model.insertLog(errDoc);

        send2console(err);
    });
};