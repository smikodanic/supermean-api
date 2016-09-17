/**
 * Users schema for Digest and JWT Authentication.
 *
 * 1. 'hash' is crypted from username and password and can't be reversed
 * 2. 'password' is decoded by Base64 and can be reversed
 */

const Schema = require('mongoose').Schema;


//options
var opts = require('./_options');
opts.collection = 'users2';

//schema definition
var Sch = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    pass: {type: String, required: true},
    hash_str: {type: String}
}, opts);


/* =-=-=-=-= MIDDLEWARES (pre & post hooks) =-=-=-=-= */
//pre middlewares
var pre_users2 = require('./_middlewares/pre_users2');
Sch.pre('save', pre_users2.createHash);
Sch.pre('save', pre_users2.cryptPass);


module.exports = Sch;
