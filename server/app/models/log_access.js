/**
 * Log endpoint access.
 */

const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
mongoose.Promise = BPromise; //Prevent error: "mpromise (mongoose's default promise library) is deprecated"

//define model
var logAccessModel = mongoose.model('logAccessMD', require('./schema/Log_access'));


//insert doc
module.exports.insertLog = function (logDoc) {
    'use strict';
    return logAccessModel.createAsync(logDoc);
};

//get doc
module.exports.getLog = function (queryObj) {
    'use strict';
    return logAccessModel
        .findOne(queryObj)
        .execAsync();
};

//count and list docs for 'queryObj'
module.exports.listlogAccess = function (queryObj, limit, skip, sort) {
    'use strict';
    return logAccessModel
        .countAsync(queryObj)
        .then(function (resultsNum) {
            return logAccessModel
                .find(queryObj)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync()
                .then(function (resultsArr) {
                    var results = {
                        count: resultsNum,
                        dataArr: resultsArr
                    };
                    return results;
                });
        });
};

//delete doc(s)
module.exports.deleteLog = function (queryObj) {
    'use strict';
    return logAccessModel.remove(queryObj);
};
