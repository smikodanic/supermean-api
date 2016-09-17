/**
 * Library for error manipulation
 */


/**
 * Format error
 * @param  {[type]} err - non formatted error
 * @return {[type]}     - JSON formatted error message
 */
module.exports.format2json = function (err) {
    'use strict';
    var jsonErr = {
        status: err.status || 500,
        message: 'APIerr: ' + err.message,
        stack: err.stack
    };
    return jsonErr;
};

module.exports.outputJSON = function (err, res) {
    'use strict';
    var err2 = module.exports.format2json(err);
    console.log(err2);
    res.status(err2.status).json(err2);
};
