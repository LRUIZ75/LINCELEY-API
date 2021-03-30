
'use strict'

var express = require('express');

var userController = require('../controllers/user.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// USER
router.post('/user',  userController.addUser); //CREATE


router.put('/user/:id',  userController.editUser); //UPDATE

router.get('/user/:id?', userController.getUser); //RETRIEVE
router.get('/user',  userController.getUser); //RETRIEVE
router.delete('/user/:id',  userController.deactivateUser); //DEATIVATE

//router.delete('/user/:id',  userController.deleteUser); //DELETE


module.exports = router;