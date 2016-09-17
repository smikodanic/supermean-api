/**
 * ************** /server/api/index.js
 * Main application file
 * - middlewares
 * - api routing
 */

/* enables requireing from root, for example require('server/app/config') */
require('rootpath')();

var config = require('./config');
var express = require('express');
var app = express();
var path = require('path');




/***** MIDDLEWARES *****/
/***********************/
require('./middlewares/logger_morgan.js')(app, config); //must be first to log each request (also static files)
require('./middlewares/debug.js')(app, config);
require('./middlewares/bodyParser.js')(app);

//=-=-= database middlewares
var dbConfig = config.env.database.mongodb[0]; //default database
require('./middlewares/database/' + dbConfig.driver + 'Driver.js').konektDefault(dbConfig);

//=-=-= virtual host
// require('./middlewares/virtual_host.js')(app, config);

//=-=-= static file middlewares --- path.join() creates absolute path from root
app.use('/assets', express.static(path.join(__dirname, '/assets')));

//=-=-= auth middlewares
require('./middlewares/auth/passport.js')(app); //passport common middleware
require('./middlewares/auth/passportstrategy_basic.js')();
require('./middlewares/auth/passportstrategy_digest.js')();
require('./middlewares/auth/passportstrategy_jwt.js')();
require('./middlewares/auth/passportstrategy_hash.js')();


/****** AUTH and CORS for each request *****/
/************************************/
// app.all('/', passport.authenticate('digest', {session: false}), function (req, res) {
//     'use strict';
//     //CROSS-DOMAIN RESOURCE SHARING
//     res.setHeader('Access-Control-Allow-Origin', '*');
// });


//****** CORS PROBLEM & OTHER HEADERS *****
//*****************
app.use(function (req, res, next) {
    'use strict';
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, HEAD',
        'Access-Control-Max-Age': '3600'
    });
    // console.log(res.get('Access-Control-Allow-Origin'));
    next();
});


/****** SERVER SIDE, API ROUTES *****/
/************************************/
app.use('/', require('./routes/index.js'));

//*** api examples
app.use('/examples', require('./routes/examples/index.js'));
app.use('/examples/auth', require('./routes/examples/auth/index.js'));
app.use('/examples/auth/passport', require('./routes/examples/auth/passport/index.js'));




/****** ERROR HANDLER *****/
/************************************/
app.use(require('./middlewares/errorHandler.js').asJSON);
/*
{
  "status": 500,
  "message": "APIerr: Converting circular structure to JSON",
  "stack": "TypeError: Converting circular structure to JSON\n    at Object.stringify (native)\n    at module.exports.main (/homenode/supermean-api/server/app/routes/examples/auth/passport/basicstrategy.js:20:22)\
 }
 */




/****** BAD URL, ERROR 404 *****/
/************************************/
app.use(function (req, res) {
    'use strict';
    var jdata = {
        status: 404,
        message: 'Error 404: URL not found!',
        endpoint: req.method + ' ' + req.url
    };

    res.status(404).json(jdata);
});






module.exports = app;
