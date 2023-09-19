var CryptoJS = require("crypto-js");
require('dotenv').config();

function encrypt(message) {
    const key = process.env.AES_KEY;
    return CryptoJS.AES.encrypt(message, key).toString();
}

function decrypt(message) {
    const key = process.env.AES_KEY;
    let bytes  = CryptoJS.AES.decrypt(message, key);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);

    return originalText;
}

module.exports = {
    encrypt, decrypt
}