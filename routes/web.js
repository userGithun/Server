const express = require("express");
const ContactController = require("../controllers/ContactController");
const UserController = require("../controllers/UserController");
const verifyToken = require("../middleware/auth");
const TeacherController = require("../controllers/TeacherController");
const route = express.Router();

//contact API
route.post('/contactInsert',ContactController.contactInsert)
route.get('/contactdisplay',ContactController.contactDisplay)
route.get('/contactview/:id',ContactController.contactView)
route.delete('/contactdelete/:id',ContactController.contactDelete)
route.put('/contactupdate/:id',ContactController.contactUpdate)
//contact API

//Teacher API
route.post('/teacherInsert',TeacherController.teacherInsert)
route.get('/teacherdisplay',TeacherController.teacherDisplay)
route.get('/teacherview/:id',TeacherController.teacherView)
route.put('/teacherupdate/:id',TeacherController.teacherUpdate)
route.delete('/teacherDelete/:id',TeacherController.teacherDelete)
//Teacher API

route.post('/signup',UserController.signUp)
route.post('/signin',UserController.signIn)
route.get('/getuser',verifyToken,UserController.getUser)
route.get('/logout',verifyToken,UserController.logOut)
//profile
route.post('/changepassword',verifyToken,UserController.changePassword)
route.post('/profileupdate',verifyToken,UserController.profileUpdate)

module.exports = route;
