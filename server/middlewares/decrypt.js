
const CryptoJS = require("crypto-js")

const decrypt = (req,res,next) => {
    console.log("inside decrypt : ",req.body);
    console.log("secret : ",process.env.JWT_SECRET)

    const bytes = CryptoJS.AES.decrypt(req.body.data, process.env.JWT_SECRET);
    req.body = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    next();
};

module.exports = decrypt;