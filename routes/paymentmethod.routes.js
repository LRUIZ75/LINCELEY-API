// Last Updated: 9/4/2021 16:48:54
// Updated By  : @YourName
'use strict'

var express = require('express');

var paymentmethodController = require('../controllers/paymentmethod.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// PAYMENTMETHOD
router.post('/paymentmethod',  paymentmethodController.addPaymentMethod); //CREATE


router.put('/paymentmethod/:id',  paymentmethodController.editPaymentMethod); //UPDATE

router.get('/paymentmethod/:id?', paymentmethodController.getPaymentMethod); //RETRIEVE
router.get('/paymentmethod',  paymentmethodController.getPaymentMethod); //RETRIEVE


router.delete('/paymentmethod/:id',  paymentmethodController.deletePaymentMethod); //DELETE


module.exports = router;