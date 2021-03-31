'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const UserSchema = Schema({
    name:
      { 
        type: String, 
        minlength: 4,
        maxlength: 20,        
        validate: 
        {
          validator: function(v) 
          {
              return /^([A-Z]|[a-z])[A-Za-z0-9]+$/.test(v);
          },
          message: "Invalid name"
        },
        trim:true,
        unique:true,
        required: [true,"Este campo es requerido"]
      },
    email:
      { 
        type: String,
        trim:true,
        required: [true,"Este campo es requerido"]
      },
    salt:
      { type: String },
    password:
      { 
        type:String,
        minlength: 6,
        maxlength: 10,
        trim:true,
        required: [true,"Este campo es requerido"] 
      },
    emailverified:
      { 
        type:Boolean,
        default: false
      },
    isActive:
      { 
        type:Boolean,
        default: true 
      },
    roles:
      {type: [mongoose.Schema.ObjectId]},
    person:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es Requerido"]
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties: 
 *         name:
 *           type: "string"
 *         email:
 *           type: "string"
 *         salt:
 *           type: "string"
 *         password:
 *           type: "string"
 *         emailverified:
 *           type: "boolean"
 *         isActive:
 *           type: "boolean"
 *         roles:
 *           type: "array"
 *           items:
 *             type: "string"
 *         person:
 *           type: "string"
 *       required:
 *         - name
 *         - email
 *         - password
 *         - person         
 */

module.exports = mongoose.model('User',UserSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

