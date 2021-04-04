'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const ClaimSchema = Schema({
    user:
      { 
        type: mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
    token:
      { 
        type:String,
        required: [true,"Este campo es requerido"] 
      },
    refreshToken:
      { type:String,
        required: [true,"Este campo es requerido"] 
      },
    dateCreated:    
      { 
        type:Date,
        default: Date.now(),
        required: [true,"Este campo es requerido"] 
      },
    isValid:
      { type:Boolean,
        required: [true,"Este campo es requerido"] }
    
});

//ToDo: ODEM Eliiminar esta parte del swagger
//Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Claim:
 *       properties: 
 *         user:
 *           type: "string"
 *           format: "ObjectId"
 *         token:
 *           type: "string"
 *         refreshToken:
 *           type: "string"
 *         dateCreated:
 *           type: "date"
 *         isValid:
 *           type: "boolean"
 *       required:
 *         - user
 *         - token
 *         - refreshToken
 *         - dateCreated
 *         - isValid
 */

module.exports = mongoose.model('Claim',ClaimSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

