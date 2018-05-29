/**
 * Validate text input
 *
 * ****** Caution: Returned value must be Boolean !
 */


/**
 * String must have from min to max characters.
 * @param  {String} pathValue - path value of doc to be inserted
 * @param  {Number} minLength - min allowed length
 * @param  {Number} maxLength - max allowed length
 *
 * @return {Boolean}    - returned value must be true or false
 */
module.exports.hasLengthBetween = function (minLength, maxLength) {
    'use strict';
    return function (pathValue) {
        return (pathValue.length >= minLength && pathValue.length <= maxLength);
    };
};


/**
 * Check if path already exist
 * @param  {String} modelName - model to be applied, for example 'usersMD'
 * @param  {String} path - document's path for example 'email'
 *
 * @return {Boolean}    - returned value must be true or false
 */
module.exports.alreadyExist = function (modelName, path) {
    'use strict';

    return function (pathValue, next) {
        //define query object, for example: queryObj = {email: pathValue}
        const queryObj = {};
        queryObj[path] = pathValue;

        this.model(modelName).count(queryObj, function (err, count) {
            if (err) {
                return next(err);
            }
            // If `count` is greater than zero, "invalidate"
            next(!count);
        });
    };
};
