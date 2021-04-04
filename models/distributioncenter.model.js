'use strict'

const mongoose = require('mongoose');
const validator = require('validator');
const location = require('./location.model');
const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const DistributionCenterSchema = Schema({
    name:
      { 
        type: String,
        minlength: 5,
        unique:true,
        validate: 
        {
          validator: function(v) 
          {
              return /^[A-Za-z ]+$/.test(v);
          },
          message: "Invalid name"
        },
        required: [true,"Este campo es requerido"]
      },
    company:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
      },
      location:
      { 
        type: {location}
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
 *     DistributionCenter:
 *       properties: 
 *         name:
 *           type: "string"
 *         company:
 *           type: "string"
 *           format: "ObjectId"
 *         location:
 *           $ref: "#/components/schemas/Location"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - name
 *         - company
 */

module.exports = mongoose.model('DistributionCenter',DistributionCenterSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

