/* enables requireing from root, for example require('server/app/config') */
require('rootpath')();

const path = require('path');
const express = require('express');
var app = express();
var config = require('server/app/config');



/***** MIDDLEWARES *****/
require('./middlewares/logger_morgan.js')(app, config); //must be first to log each request (also static files)
// require('./middlewares/debug.js')(app, config);
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
// require('./middlewares/auth/passportstrategy_basic.js')();
// require('./middlewares/auth/passportstrategy_digest.js')();
// require('./middlewares/auth/passportstrategy_hash.js')();
require('./middlewares/auth/passportstrategy_jwt.js').defineStrategy4panel();


//=-=-= get client ip (req.client.ip)
app.use(require('./middlewares/request-ip.js'));

//=-=-= CORS PROBLEM & OTHER HEADERS
app.use(require('./middlewares/cors.js'));


/****** API ROUTES *****/
app.use('/', require('./routes/_routes.js'));



/***** REBUILD MONGO INDEXES *****/
if (config.rebuildIndexes) {//export NODE_RIND=true
    require('./middlewares/database/rebuildIndexes').allModels();
}


/******************** ERROR HANDLERS ********************/
app.use(require('./middlewares/error.js').badurl); //404 not found middleware. Must be last middleware !
app.use(require('./middlewares/error.js').sender); //send error to client, sentry and mongo
require('./middlewares/error.js').uncaught(); //uncaught exceptions



module.exports = app;
