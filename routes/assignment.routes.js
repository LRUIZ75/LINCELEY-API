
'use strict'

var express = require('express');

var assignmentController = require('../controllers/assignment.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// ASSIGNMENT
router.post('/assignment',  assignmentController.addAssignment); //CREATE


router.put('/assignment/:id',  assignmentController.editAssignment); //UPDATE

router.get('/assignment/:id?', assignmentController.getAssignment); //RETRIEVE
router.get('/assignment',  assignmentController.getAssignment); //RETRIEVE


router.delete('/assignment/:id',  assignmentController.deleteAssignment); //DELETE


module.exports = router;