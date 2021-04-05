
'use strict'

var express = require('express');

var employeeController = require('../controllers/employee.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// EMPLOYEE
router.post('/employee',  employeeController.addEmployee); //CREATE


router.put('/employee/:id',  employeeController.editEmployee); //UPDATE

router.get('/employee/:id?', employeeController.getEmployee); //RETRIEVE
router.get('/employee',  employeeController.getEmployee); //RETRIEVE

router.delete('/employee/:id',  employeeController.deactivateEmployee); //deactivate
router.delete('/employee/:id',  employeeController.deleteEmployee); //DELETE


module.exports = router;