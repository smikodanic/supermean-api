/**
 * Actions on model
 */


//bluebird promisification
const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));

//define model
var users1Model = mongoose.model('users1MD', require('./schema/Users1'));


//fill the database with users
module.exports.createMany = function (docArr) {
    'use strict';
    return users1Model.createAsync(docArr);
};


//list all users
module.exports.getAll = function (moQueryObj) {
    'use strict';
    return users1Model.findAsync(moQueryObj);
};


//delete users found by query
module.exports.del = function (moQueryObj) {
    'use strict';
    return users1Model.removeAsync(moQueryObj);
};


//find user doc by username
module.exports.getByUsername = function (username, fields) {
    'use strict';
    return users1Model
        .findOne({username: username}, fields)
        .select('name username pass -_id')
        .execAsync();
};

