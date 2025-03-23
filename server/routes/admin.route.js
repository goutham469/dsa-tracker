const exp = require('express');
const {deleteUser, getAllUsers} = require('../controllers/admin.controller');
const adminAPI = exp.Router()


adminAPI.delete("/delete-user" , deleteUser )
adminAPI.get("/all-users" , getAllUsers)

module.exports = adminAPI;