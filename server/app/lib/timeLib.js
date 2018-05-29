/**
 * Library for time manipulation
 */


/**
 * Convert seconds to more human readable string
 * @param  {[type]} seconds [description]
 * @return {[type]}         [description]
 */
module.exports.secondsToString = function (seconds) {
    'use strict';
    const numdays = Math.floor(seconds / 86400);
    const numhours = Math.floor((seconds % 86400) / 3600);
    const numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    const numseconds = ((seconds % 86400) % 3600) % 60;
    return numdays + ' days ' + numhours + ' hours ' + numminutes + ' minutes ' + numseconds + ' seconds';
};
