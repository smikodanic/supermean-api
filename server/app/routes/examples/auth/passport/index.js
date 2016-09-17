/**
 * /examples/auth/passport/.*
 */
var router = require('express').Router();


//indeks
router.get('/', require('./indeks.js').main);
router.get('/badauth', require('./indeks.js').badauth);

//Basic strategy
var basicstrategy = require('./basicstrategy.js');
router.route('/basicstrategy')
    .get(basicstrategy.auth, basicstrategy.main)
    .post(basicstrategy.auth, basicstrategy.main);
router.get('/basicstrategy/getsomedata', basicstrategy.auth, basicstrategy.getsomedata);


//Digest strategy
var digeststrategy = require('./digeststrategy.js');
router.get('/digeststrategy', digeststrategy.auth, digeststrategy.main);
//router.get('/digeststrategy', digeststrategy.getHeaders, digeststrategy.auth, digeststrategy.main);


//JWT strategy
var jwtstrategy = require('./jwtstrategy.js');
router.post('/jwtstrategy-gettoken', jwtstrategy.gettoken); //sends token to the client if username:pass is correct
router.get('/jwtstrategy', jwtstrategy.auth, jwtstrategy.main);
// router.get('/jwtstrategy', jwtstrategy.getHeaders, jwtstrategy.auth, jwtstrategy.main);
router.get('/jwtstrategy/getsomedata', jwtstrategy.auth, jwtstrategy.getsomedata);


//Hash strategy
var hashstrategy = require('./hashstrategy.js');
router.post('/hashstrategy-gethash', hashstrategy.gethash); //get hash_str from db if username:pass is correct
router.get('/hashstrategy/:hash', hashstrategy.auth, hashstrategy.main);
router.get('/hashstrategy/getsomedata/:hash', hashstrategy.auth, hashstrategy.getsomedata);



module.exports = router;
