'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const EmployeeSchema = Schema({
    employeeId:
      { type: String,
      description:"Employee identification number or name"
    },
    department:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    jobposition:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    person:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    email:
    {
      type: String
    },
    sueldo:
    {
      type: Number
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
 *           description: "Employee identification number or name"
 *         department:
 *           type: "string"
 *           format: "ObjectId"
 *         jobposition:
 *           type: "string"
 *           format: "ObjectId"
 *         person:
 *           type: "string"
 *           format: "ObjectId"
 *         email:
 *           type: "string"
 *           format: "email"
 *         sueldo:
 *           type: "number"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - department
 *         - jobposition
 *         - person
 */

module.exports = mongoose.model('Employee',EmployeeSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

