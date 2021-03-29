
'use strict'

var express = require('express');

var claimController = require('../controllers/claim.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// CLAIM
router.post('/claim',  claimController.addClaim); //CREATE


router.put('/claim/:id',  claimController.editClaim); //UPDATE

router.get('/claim/:id?', claimController.getClaim); //RETRIEVE
router.get('/claim',  claimController.getClaim); //RETRIEVE


router.delete('/claim/:id',  claimController.deleteClaim); //DELETE


module.exports = router;