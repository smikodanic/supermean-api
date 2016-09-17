/**
 * Actions on model
 */


//bluebird promisification
const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
var authLib = require('server/app/lib/authLib');

//define model
var users2Model = mongoose.model('users2MD', require('./schema/Users2'));


//fill the database with users
module.exports.createMany = function (docArr) {
    'use strict';
    return users2Model.createAsync(docArr);
};


//list all users
module.exports.getAll = function (moQueryObj) {
    'use strict';
    return users2Model.findAsync(moQueryObj);
};


//delete users found by query
module.exports.del = function (moQueryObj) {
    'use strict';
    return users2Model.removeAsync(moQueryObj);
};


//find user doc by username
module.exports.getByUsername = function (username, fields) {
    'use strict';
    return users2Model
        .findOne({username: username}, fields)
        .select('name username pass -_id')
        .execAsync();
};

//find user doc by _id
module.exports.getUserById = function (id) {
    'use strict';
    return users2Model
        .findById(id)
        .select('name username pass -_id')
        .execAsync();
};

//find user doc by hash
module.exports.getUserByHash = function (hash) {
    'use strict';
    return users2Model
        .findOne({hash_str: hash})
        .select('name username pass -_id')
        .execAsync();
};

//check credentials username:pass
module.exports.checkCredentials = function (username, pass) {
    'use strict';
    return users2Model
        .findOne({username: username})
        .then(function (userDoc) {
            if (!userDoc) throw new Error('Username does not exists.');

            var passDecoded = authLib.base64ToStr(userDoc.pass)
            if (passDecoded !== pass) {
                throw new Error('Password is not correct.');
            } else {
                return userDoc;
            }
        })
};

