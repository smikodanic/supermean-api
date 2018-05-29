const express = require('express');
const router = express.Router();
const authCheckUsers = require('./_middlewares.js').authCheckUsers;
const mustHaveRole = require('./_middlewares.js').mustHaveRole;
const log_access = require('./_middlewares.js').log_access; //log requests to 'log_access' collection


/*** basic API v1 routes ***/
router.get('/', require('./api.js').root);
router.get('/apiinfo', require('./api.js').apiinfo);



/*** User endpoints ***/
const users = require('./users.js');
router.post('/users/register', users.register);
router.post('/users/login', log_access, users.login);
router.get('/users/loggedinfo', authCheckUsers, mustHaveRole(['admin', 'customer']), log_access, users.loggedinfo);

// admin
router.get('/admin/test', authCheckUsers, mustHaveRole('admin'),  log_access, require('./admin/test.js').index);

// customer
router.get('/customer/test', authCheckUsers, mustHaveRole('customer'),  log_access, require('./customer/test.js').index);



module.exports = router;
