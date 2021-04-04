'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const EmployeeSchema = Schema({
    employeeId:
      { type: String },
    departament:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    jobposition:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    user:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    isActive:
      { 
        type:Boolean,
        default:true 
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       properties: 
 *         employeeId:
 *           type: "string"
 *         departament:
 *           type: "string"
 *           format: "ObjectId"
 *         jobposition:
 *           type: "string"
 *           format: "ObjectId"
 *         user:
 *           type: "string"
 *           format: "ObjectId"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - departament
 *         - jobposition
 *         - user
 */

module.exports = mongoose.model('Employee',EmployeeSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

