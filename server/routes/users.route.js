const exp = require("express");
const decrypt = require("../middlewares/decrypt");
const { loginController } = require("../controllers/users.controller");
const usersAPI = exp.Router()

usersAPI.post("/login"  , loginController )


module.exports = usersAPI;