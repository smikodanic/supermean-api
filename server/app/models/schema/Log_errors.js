/**
 * Logging of application errors.
 * Used in /server/app/middlewares/error.js
 */

const Schema = require('mongoose').Schema;

//options
const opts = require('./_options');
opts.collection = 'log_errors';
opts.strict = false;
opts.timestamps = null; //disable timestamps


//schema definition
const Sch = new Schema({
    status: Number,
    level: {type: String, enum: ['error', 'warning', 'info', 'debug']},
    category: String,
    message: String,
    stack: String,
    verb: String,
    url: String,
    ip: String,
    time: Date,
    user: {
        id: String,
        username: String,
        email: String,
        role: String
    },
    err_orig: Schema.Types.Mixed
}, opts);


module.exports = Sch;
