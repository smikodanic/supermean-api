const express = require('express');
const router = express.Router();
var authCheckPanel = require('./_middlewares.js').authCheckPanel;
var mustHaveRole = require('./_middlewares.js').mustHaveRole;
var log_access = require('./_middlewares.js').log_access; //log requests to 'log_access' collection


/*** basic API v1 routes ***/
router.get('/', require('./api.js').root);
router.get('/apiinfo', require('./api.js').apiinfo);



//*** User endpoints
var users = require('./users.js');
router.post('/users/register', users.register);
router.post('/users/login', log_access, users.login);
router.get('/users/loggedinfo', authCheckPanel, mustHaveRole(['admin', 'moderator']), log_access, users.loggedinfo);



module.exports = router;
