'use strict'

const mongoose = require('mongoose');
const validator = require('validator');
//const location = require('./location.model');

const Schema = mongoose.Schema;


//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const CompanySchema = Schema({
    fullName:
      { 
        type: String,
        unique:true,
        minlength: 2,       
        required: [true,"Este campo es requerido"] 
      },
    shortName:
      { 
        type:String,        
        required: [true,"Este campo es requerido"] 
      },
    isActive:
      { 
        type:Boolean,
        default: true
      },
    location: {
      lat: {
        type: Number,
        default: 0
      },
      lng: {
        type: Number,
        default: 0
      }

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
 *           type: "number"
 *         lng:
 *           type: "number"
 *       required:
 *         - lat
 *         - lng
 */


//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       properties: 
 *         fullName:
 *           type: "string"
 *           minLength: 2
 *         shortName:
 *           type: "string"
 *         isActive:
 *           type: "boolean"
 *         location:          
 *           $ref: "#/components/schemas/Location"
 *       required:
 *         - fullName
 *         - shortName
 */

module.exports = mongoose.model('Company',CompanySchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

