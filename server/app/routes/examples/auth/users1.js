/**
 * /examples/auth/users1-.*
 *
 * Manipulation with 'users1' collection.
 */

var users1_model = require('server/app/models/examples/users1');
var errorLib = require('server/app/lib/errorLib');

/* POST /examples/auth/users1-insmulti

{"userArr": [
    {
        "name": "John Deer",
        "username": "john",
        "pass": "test"
    },
     {
        "name": "Pero perić",
        "username": "pero",
        "pass": "test"
    },
     {
        "name": "Marko Marković",
        "username": "marko",
        "pass": "test2"
    }
]}
  */
module.exports.insmulti = function (req, res) {
    'use strict';

    var userArr = req.body.userArr;

    //inserting users
    users1_model.createMany(userArr)
        .then(function (insUsers) {
            res.json(insUsers);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};


/* GET /examples/auth/users1-getall */
module.exports.getall = function (req, res, next) {
    'use strict';

    var moQueryObj = {};

    users1_model.getAll(moQueryObj)
        .then(function (resultsArr) {
            res.json(resultsArr);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};

/* DELETE /examples/auth/users1-delall
{q: {}}
{q: {"username": "john"}}
*/
module.exports.delete = function (req, res, next) {
    'use strict';

    var moQueryObj = req.body.q;
    console.log(JSON.stringify(moQueryObj, null, 2));

    users1_model.del(moQueryObj)
        .then(function (resultsArr) {
            res.json(resultsArr);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};
