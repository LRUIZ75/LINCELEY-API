'use strict'

const mongoose = require('mongoose');
const validator = require('validator');
const location = require('./location.model');
const Schema = mongoose.Schema;



//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const CompanySchema = Schema({
    fullName:
      { 
        type: String,
        validate: 
        {
          validator: function(v) 
          {
              return /^[A-Za-z ]+$/.test(v);
          },
          message: "Invalid fullName"
        },
        required: [true,"Este campo es requerido"] 
      },
    shortName:
      { 
        type:String,
        validate: 
        {
          validator: function(v) 
          {
              return /^[A-Za-z]+$/.test(v);
          },
          message: "Invalid shortName"
        },
        required: [true,"Este campo es requerido"] 
      },
    isActive:
      { 
        type:Boolean,
        default: true
      },
    location:
      { 
        type: {location}
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       properties: 
 *         fullName:
 *           type: "string"
 *         shortName:
 *           type: "string"
 *         isActive:
 *           type: "boolean"
 *         location:
 *           type: "object"
 *
 */

module.exports = mongoose.model('Company',CompanySchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

