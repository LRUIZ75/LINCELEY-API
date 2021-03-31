
'use strict'

var express = require('express');

var collectlocationController = require('../controllers/collectlocation.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// COLLECTLOCATION
router.post('/collectlocation',  collectlocationController.addCollectLocation); //CREATE


router.put('/collectlocation/:id',  collectlocationController.editCollectLocation); //UPDATE

router.get('/collectlocation/:id?', collectlocationController.getCollectLocation); //RETRIEVE
router.get('/collectlocation',  collectlocationController.getCollectLocation); //RETRIEVE


router.delete('/collectlocation/:id',  collectlocationController.deleteCollectLocation); //DELETE


module.exports = router;