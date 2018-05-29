/**
 * Log endpoint access.
 */

const Schema = require('mongoose').Schema;

//options
const opts = require('./_options');
opts.collection = 'log_access';
opts.strict = false;
opts.timestamps = null; //disable timestamps

//schema definition
const Sch = new Schema({
    status: Number, //200, 404
    verb: String,
    url: String,
    user_id: Schema.Types.ObjectId,
    user_role: String,
    ip: String,
    time: Date
}, opts);


module.exports = Sch;
