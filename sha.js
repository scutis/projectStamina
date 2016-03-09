var crypto = require('crypto');
var key = 'qW25GkqhCcfp8mE9';

var hash = function (plainText, salt){
    var sha512 = crypto.createHmac('sha512', key);
    sha512.update(plainText + salt);

    return sha512.digest('hex');
};

module.exports = hash;