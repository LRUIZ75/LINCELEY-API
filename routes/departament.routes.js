
'use strict'

var express = require('express');

var departamentController = require('../controllers/departament.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// DEPARTAMENT
router.post('/departament',  departamentController.addDepartament); //CREATE


router.put('/departament/:id',  departamentController.editDepartament); //UPDATE

router.get('/departament/:id?', departamentController.getDepartament); //RETRIEVE
router.get('/departament',  departamentController.getDepartament); //RETRIEVE

router.delete('/departament/:id',  departamentController.deactivateDepartament); //DEACTIVATE
//router.delete('/departament/:id',  departamentController.deleteDepartament); //DELETE


module.exports = router;