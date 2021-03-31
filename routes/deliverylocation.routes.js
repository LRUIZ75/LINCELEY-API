
'use strict'

var express = require('express');

var deliverylocationController = require('../controllers/deliverylocation.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// DELIVERYLOCATION
router.post('/deliverylocation',  deliverylocationController.addDeliveryLocation); //CREATE


router.put('/deliverylocation/:id',  deliverylocationController.editDeliveryLocation); //UPDATE

router.get('/deliverylocation/:id?', deliverylocationController.getDeliveryLocation); //RETRIEVE
router.get('/deliverylocation',  deliverylocationController.getDeliveryLocation); //RETRIEVE


router.delete('/deliverylocation/:id',  deliverylocationController.deleteDeliveryLocation); //DELETE


module.exports = router;