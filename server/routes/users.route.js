const exp = require("express");
const decrypt = require("../middlewares/decrypt");
const { loginController, updateUserDetails } = require("../controllers/users.controller");
const usersAPI = exp.Router()

usersAPI.post("/login"  , loginController );
usersAPI.put("/update-user-details" , updateUserDetails);


module.exports = usersAPI;