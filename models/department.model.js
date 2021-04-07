// Last Updated: 7/4/2021 10:02:26
// Updated By  : @YourName
'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const DepartmentSchema = Schema({
    name:
      { 
        type: String,
        trim:true,
        required: [true,"Este campo es requerido"] 
      },
    company:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"]
      },
    isActive:
      { 
        type: Boolean,
        default: true
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       properties: 
 *         name:
 *           type: "string"
 *         company:
 *           type: "string"
 *           format: "ObjectId"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - name
 *         - company 
 *
 */

module.exports = mongoose.model('Department',DepartmentSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

