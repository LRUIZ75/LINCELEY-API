
'use strict'

var express = require('express');

var jobpositionController = require('../controllers/jobposition.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// JOBPOSITION
router.post('/jobposition',  jobpositionController.addJobPosition); //CREATE


router.put('/jobposition/:id',  jobpositionController.editJobPosition); //UPDATE

router.get('/jobposition/:id?', jobpositionController.getJobPosition); //RETRIEVE
router.get('/jobposition',  jobpositionController.getJobPosition); //RETRIEVE


router.delete('/jobposition/:id',  jobpositionController.deleteJobPosition); //DELETE


module.exports = router;