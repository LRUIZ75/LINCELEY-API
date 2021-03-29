
'use strict'

var express = require('express');

var roleactionController = require('../controllers/roleaction.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// ROLEACTION
router.post('/roleaction',  roleactionController.addRoleAction); //CREATE


router.put('/roleaction/:id',  roleactionController.editRoleAction); //UPDATE

router.get('/roleaction/:id?', roleactionController.getRoleAction); //RETRIEVE
router.get('/roleaction',  roleactionController.getRoleAction); //RETRIEVE


router.delete('/roleaction/:id',  roleactionController.deleteRoleAction); //DELETE


module.exports = router;