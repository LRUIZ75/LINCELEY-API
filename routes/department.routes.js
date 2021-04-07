// Last Updated: 7/4/2021 10:02:26
// Updated By  : @YourName
'use strict'

var express = require('express');

var departmentController = require('../controllers/department.controller');

var router = express.Router();

var multipart = require('connect-multiparty');


/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// DEPARTMENT
router.post('/department',  departmentController.addDepartment); //CREATE


router.put('/department/:id',  departmentController.editDepartment); //UPDATE

router.get('/department/:id?', departmentController.getDepartment); //RETRIEVE
router.get('/department',  departmentController.getDepartment); //RETRIEVE

router.delete('/department/:id',  departmentController.deactivateDepartment); //deactivate
//router.delete('/department/:id',  departmentController.deleteDepartment); //DELETE


module.exports = router;