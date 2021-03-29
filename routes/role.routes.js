
'use strict'

var express = require('express');

var roleController = require('../controllers/role.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// ROLE
router.post('/role',  roleController.addRole); //CREATE


router.put('/role/:id',  roleController.editRole); //UPDATE

router.get('/role/:id?', roleController.getRole); //RETRIEVE
router.get('/role',  roleController.getRole); //RETRIEVE


router.delete('/role/:id',  roleController.deleteRole); //DELETE


module.exports = router;