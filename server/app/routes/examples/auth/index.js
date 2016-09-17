/**
 * /examples/auth/.*
 */
var router = require('express').Router();

router.get('/', require('./indeks').main);

//users1 collection
router.post('/users1-insmulti', require('./users1.js').insmulti);
router.get('/users1-getall', require('./users1.js').getall);
router.delete('/users1-delete', require('./users1.js').delete);

//users2 collection
router.post('/users2-insmulti', require('./users2.js').insmulti);
router.get('/users2-getall', require('./users2.js').getall);
router.delete('/users2-delete', require('./users2.js').delete);

module.exports = router;
