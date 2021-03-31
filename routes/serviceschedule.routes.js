
'use strict'

var express = require('express');

var servicescheduleController = require('../controllers/serviceschedule.controller');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_uploadpictures = multipart({uploadDir: './uploads/pictures/'});

/* 
C for Create: HTTP POST
R for Read: HTTP GET
U for Update: HTTP PUT
D for Delete: HTTP DELETE 
*/



// SERVICESCHEDULE
router.post('/serviceschedule',  servicescheduleController.addServiceSchedule); //CREATE


router.put('/serviceschedule/:id',  servicescheduleController.editServiceSchedule); //UPDATE

router.get('/serviceschedule/:id?', servicescheduleController.getServiceSchedule); //RETRIEVE
router.get('/serviceschedule',  servicescheduleController.getServiceSchedule); //RETRIEVE


router.delete('/serviceschedule/:id',  servicescheduleController.deleteServiceSchedule); //DELETE


module.exports = router;