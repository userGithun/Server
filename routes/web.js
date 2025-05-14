const express = require("express");
const ContactController = require("../controllers/ContactController");
const UserController = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");
const route = express.Router();


route.post('/contactInsert',ContactController.contactInsert)
route.get('/contactdisplay',ContactController.contactDisplay)
route.get('/contactview/:id',ContactController.contactView)
route.delete('/contactdelete/:id',ContactController.contactDelete)
route.put('/contactupdate/:id',ContactController.contactUpdate)
//
route.post('/signup',UserController.signUp)
route.post('/signin',UserController.signIn)
route.get('/getuser',verifyToken,UserController.getUser)
route.get('/logout',verifyToken,UserController.logOut)
//profile
route.post('/changepassword',verifyToken,UserController.changePassword)
route.post('/profileupdate',verifyToken,UserController.profileUpdate)

module.exports = route;
