'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const AssignmentSchema = Schema({
    driver:
      { 
        type: mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"]
      },
    vehicle:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    assignmentDate:
      { 
        type:Date, 
        default: Date.now()
      },
    isPermanent:
      { 
        type:Boolean,
        default:false
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
 *           type: "mongoose.schema.objectid"
 *         vehicle:
 *           type: "mongoose.schema.objectid"
 *         assignmentDate:
 *           type: "date"
 *         isPermanent:
 *           type: "boolean"
 *       required:
 *         - driver
 *         - vehicle
 */

module.exports = mongoose.model('Assignment',AssignmentSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

