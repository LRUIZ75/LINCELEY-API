
'use strict'

var express = require('express');

var distributioncenterController = require('../controllers/distributioncenter.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// DISTRIBUTIONCENTER
router.post('/distributioncenter',  distributioncenterController.addDistributionCenter); //CREATE


router.put('/distributioncenter/:id',  distributioncenterController.editDistributionCenter); //UPDATE

router.get('/distributioncenter/:id?', distributioncenterController.getDistributionCenter); //RETRIEVE
router.get('/distributioncenter',  distributioncenterController.getDistributionCenter); //RETRIEVE

router.delete('/distributioncenter/:id',  distributioncenterController.deactivateDistributionCenter); //DEACIVATE
//router.delete('/distributioncenter/:id',  distributioncenterController.deleteDistributionCenter); //DELETE


module.exports = router;