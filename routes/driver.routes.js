
'use strict'

var express = require('express');

var driverController = require('../controllers/driver.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// DRIVER
router.post('/driver',  driverController.addDriver); //CREATE


router.put('/driver/:id',  driverController.editDriver); //UPDATE

router.get('/driver/:id?', driverController.getDriver); //RETRIEVE
router.get('/driver',  driverController.getDriver); //RETRIEVE

router.delete('/driver/:id',  driverController.deactivateDriver); //DEACTIVATE
//router.delete('/driver/:id',  driverController.deleteDriver); //DELETE


router.put('/driver/:field/:id', [ md_uploadpictures], driverController.setPicture); //UPDATE IMAGE 
router.get('/driver/picture/:filename', driverController.getPicture); //RETRIEVE IMAGE 

module.exports = router;