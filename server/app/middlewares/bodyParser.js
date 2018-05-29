/**
 * Node.js body parser
 * Enables sending data from form by using POST method.
 * https://www.npmjs.com/package/body-parser
 */

const bodyParser = require('body-parser');

module.exports = function (app) {
    'use strict';
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
};
