
'use strict'

var express = require('express');

var clientController = require('../controllers/client.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// CLIENT
router.post('/client',  clientController.addClient); //CREATE


router.put('/client/:id',  clientController.editClient); //UPDATE

router.get('/client/:id?', clientController.getClient); //RETRIEVE
router.get('/client',  clientController.getClient); //RETRIEVE


router.delete('/client/:id',  clientController.deleteClient); //DELETE


module.exports = router;