'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const AssignmentSchema = Schema({
    driver:
      { 
        type: Schema.Types.ObjectId,
        ref: 'Driver',
        required: [true,"Este campo es requerido"]
      },
    vehicle:
      { 
        type: Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: [true,"Este campo es requerido"] 
      },
    assignmentDate:
      { 
        type:Date, 
        default: Date.now()
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       properties: 
 *         driver:
 *           type: "string"
 *           format: "ObjectId"
 *         vehicle:
 *           type: "string"
 *           format: "ObjectId"
 *         assignmentDate:
 *           type: "string"
 *           format: "date"         
 *       required:
 *         - driver
 *         - vehicle
 */

module.exports = mongoose.model('Assignment',AssignmentSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

