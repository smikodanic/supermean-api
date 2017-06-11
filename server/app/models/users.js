/**
 * Managing 'users' collection.
 */


//bluebird promisification
const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
mongoose.Promise = require('bluebird'); //Prevent error: "mpromise (mongoose's default promise library) is deprecated"
var authLib = require('server/app/lib/authLib');

//define models
var usersModel = mongoose.model('usersMD', require('./schema/Users'));


//register new user
module.exports.register = function (userDoc) {
    'use strict';
    return usersModel.createAsync(userDoc);
};


//check credentials username:password and login into UniAPI panel
module.exports.login = function (username, password) {
    'use strict';

    return usersModel
        .findOne({username: username})
        .then(function (userDoc) {
            var err;
            if (!userDoc) {
                err = new Error('Username does not exists.');
                err.level = 'info';
                throw err;
            }

            var passDecoded = authLib.base64ToStr(userDoc.password);
            if (passDecoded !== password) {
                err = new Error('Password is not correct.');
                err.level = 'info';
                throw err;
            } else {

                //can't login if user is not approved
                if (!userDoc.approved) {
                    err = new Error('Your account is not approved.');
                    err.level = 'info';
                    throw err;
                } else {
                    return userDoc;
                }

            }
        });
};


//get user doc without password
module.exports.getUser = function (queryObj) {
    'use strict';

    return usersModel
        .findOne(queryObj)
        .select('-password')
        .populate('plan_id')
        .execAsync();
};