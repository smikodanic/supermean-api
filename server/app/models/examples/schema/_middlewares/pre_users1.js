/**
 * Middlewares
 */
var authLib = require('server/app/lib/authLib');

/**
 * Crypt password before inserting into db
 * this.pass - password to be crypted
 * this.username - is the salt (username is unique so all encrypted passwords will be different)
 */
module.exports.cryptPassSha256 = function (next) {
    this.pass = authLib.strToSha256(this.pass, this.username, 21);
    next();
};
