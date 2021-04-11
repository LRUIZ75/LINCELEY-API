
'use strict'

var express = require('express');

var vehicleController = require('../controllers/vehicle.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/vehicles'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// VEHICLE
router.post('/vehicle',  vehicleController.addVehicle); //CREATE


router.put('/vehicle/:id',  vehicleController.editVehicle); //UPDATE

router.get('/vehicle/:id?', vehicleController.getVehicle); //RETRIEVE
router.get('/vehicle',  vehicleController.getVehicle); //RETRIEVE

router.delete('/vehicle/:id',  vehicleController.deactivateVehicle); //DEACTIVATE
//router.delete('/vehicle/:id',  vehicleController.deleteVehicle); //DELETE


router.put('/vehicle/:field/:id', [ md_uploadpictures], vehicleController.setPicture); //UPDATE IMAGE 
router.get('/vehicle/:filename', vehicleController.getPicture); //RETRIEVE IMAGE 

module.exports = router;