/**
 * /examples/auth/users2-.*
 *
 * Manipulation with 'users2' collection.
 */

var users2_model = require('server/app/models/examples/users2');
var errorLib = require('server/app/lib/errorLib');

/* POST /examples/auth/users2-insmulti

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
    users2_model.createMany(userArr)
        .then(function (insUsers) {
            res.json(insUsers);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};


/* GET /examples/auth/users2-getall */
module.exports.getall = function (req, res, next) {
    'use strict';

    var moQueryObj = {};

    users2_model.getAll(moQueryObj)
        .then(function (resultsArr) {
            res.json(resultsArr);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};

/* DELETE /examples/auth/users2-delall
{q: {}}
{q: {"username": "john"}}
*/
module.exports.delete = function (req, res, next) {
    'use strict';

    var moQueryObj = req.body.q;
    console.log(JSON.stringify(moQueryObj, null, 2));

    users2_model.del(moQueryObj)
        .then(function (resultsArr) {
            res.json(resultsArr);
        })
        .catch(function (err) {
            errorLib.outputJSON(err, res);
        });
};
