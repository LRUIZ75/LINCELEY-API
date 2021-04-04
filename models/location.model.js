'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


var LocationSchema = new Schema({
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    }
  });

  //ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       properties: 
 *         lat:
 *           type: "string"  
 *         lng:
 *           type: "string"
 *       required: 
 *         - lat
 *         - lng
 */

module.exports = mongoose.model('GeoLocation', LocationSchema);