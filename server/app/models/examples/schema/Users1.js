/**
 * Users schema for Basic Authentication.
 *
 * IMPORTANT:
 *   Passwords are encoded by SHA256 one way encoder and cann't be reversed.
 *
 */

const Schema = require('mongoose').Schema;


//options
var opts = require('./_options');
opts.collection = 'users1';

//schema definition
var Sch = new Schema({
    name: String,
    username: {type: String, name: 'uzer', required: true, index: {unique: true}},
    pass: {type: String, required: true}
}, opts);


/* =-=-=-=-= MIDDLEWARES (pre & post hooks) =-=-=-=-= */
//pre middlewares
var pre_users1 = require('./_middlewares/pre_users1');
Sch.pre('save', pre_users1.cryptPassSha256); //sha256 is one way encoder


module.exports = Sch;
