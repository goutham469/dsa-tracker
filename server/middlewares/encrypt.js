
const CryptoJS = require("crypto-js")

function encrypt(data)
{
    return CryptoJS.AES.encrypt(JSON.stringify(data), process.env.JWT_SECRET).toString();
}

module.exports = encrypt;