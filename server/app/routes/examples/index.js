/**
 ****** /server/app/routes/examples/index.js
 * Server Side Examples
 */

var config = require('../../config');
var express = require('express');
var router = express.Router();


/**
 * GET /examples
 */
router.get('/', function (req, res, next) {
    'use strict';
    var jdata = {
        title: 'API Examples',
        sections: ['auth']
    };

    res.json(jdata);
});









module.exports = router;
