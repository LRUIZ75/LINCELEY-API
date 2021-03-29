
'use strict'

var express = require('express');

var companyController = require('../controllers/company.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// COMPANY
router.post('/company',  companyController.addCompany); //CREATE


router.put('/company/:id',  companyController.editCompany); //UPDATE

router.get('/company/:id?', companyController.getCompany); //RETRIEVE
router.get('/company',  companyController.getCompany); //RETRIEVE


router.delete('/company/:id',  companyController.deleteCompany); //DELETE


module.exports = router;