/**
 * Library for authentication
 */
const crypto = require('crypto');



/**
 * Crypt string by synchronous Password-Based Key Derivation Function 2 (PBKDF2).
 * @param  {[type]} str - input string to be crypted
 * @return {[type]}     - encrypted string: "66ca2509023527f51651d20c898e2201e801ad0817"
 *
 * Possible alghoritms: sha1, sha256, sha512, md5
 * PBKDF2 is a one-way hashing algorithm. It's not possible to decrypt the generated hash.
 */
module.exports.strToSha256 = function (str, salt, length) {
    'use strict';
    return crypto.pbkdf2Sync(str, salt, 1000, length, 'sha256').toString('hex');
};




/**
 * Base64 encoder. Base64 is reversible function, so string can be reverted back (decoded).
 * @param  {[type]} str - input string to be crypted "test"
 * @return {[type]}     - encoded string: "dGVzdA=="
 */
module.exports.strToBase64 = function (str) {
    'use strict';
    const buff = new Buffer(str);
    const b64 = buff.toString('base64');
    return b64;
};

/**
 * Base64 decoder.
 * @param  {[type]} b64 - input string to be decoded: dGVzdA==
 * @return {[type]}     - decoded string: "test"
 */
module.exports.base64ToStr = function (b64) {
    'use strict';
    const buff = new Buffer(b64, 'base64');
    const str = buff.toString();
    return str;
};


/**
 * Crypt and decrypt password
 * @param  {[type]} text [description]
 * @return {[type]}      [description]
 */
const algorithm = 'des-ede3-cbc';
const encryption_key = 'grGyDoki23wers';
const algo = 'base64'; //can be 'hex'
module.exports.encrypt = function (text) {
    'use strict';
    const cipher = crypto.createCipher(algorithm, encryption_key);
    const crypted = cipher.update(text, 'utf8', algo);
    crypted += cipher.final(algo);
    return crypted;
};
module.exports.decrypt = function (text) {
    'use strict';
    const decipher = crypto.createDecipher(algorithm, encryption_key);
    const dec = decipher.update(text, algo, 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
