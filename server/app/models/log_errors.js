/**
 * Logging of application errors.
 * Used in /server/app/middlewares/error.js
 */

const BPromise = require('bluebird');
const mongoose = BPromise.promisifyAll(require('mongoose'));
mongoose.Promise = BPromise; //Prevent error: "mpromise (mongoose's default promise library) is deprecated"

//define model
const logErrorsModel = mongoose.model('logErrorsMD', require('./schema/Log_errors'));


//insert doc
module.exports.insertLog = function (logDoc) {
    'use strict';
    return logErrorsModel.createAsync(logDoc);
};

//get doc
module.exports.getLog = function (queryObj) {
    'use strict';
    return logErrorsModel
        .findOne(queryObj)
        .execAsync();
};

//count and list docs for 'queryObj'
module.exports.listlogErrors = function (queryObj, limit, skip, sort) {
    'use strict';
    return logErrorsModel
        .countAsync(queryObj)
        .then(function (resultsNum) {
            return logErrorsModel
                .find(queryObj)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .execAsync()
                .then(function (resultsArr) {
                    const results = {
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
    return logErrorsModel.remove(queryObj);
};
