/**
 * Middlewares
 */
var authLib = require('server/app/lib/authLib');

/**
 * Create hash from username and password.
 * this.pass - password to be crypted and entered by user
 * this.username - is the salt (username is unique so all encrypted passwords will be different)
 */
module.exports.createHash = function (next) {
    this.hash_str = authLib.strToSha256(this.pass, this.username, 21);
    next();
};


/**
 * Crypt password by Base64, reversible function.
 * this.pass - password to be crypted and entered by user
 */
module.exports.cryptPass = function (next) {
    this.pass = authLib.strToBase64(this.pass);
    // this.pass = authLib.encrypt(this.pass);
    next();
};
