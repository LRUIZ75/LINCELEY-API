'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

//const document = require('./document.model');
const Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  registrationCard: {
      type: String,
      required: true
  },
  insuranceCard: {
      type: String,
      required: true
  }
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const VehicleSchema = Schema({
    plateNumber:
      { 
        type: String,
        required: [true,"Este campo es requerido"]  
      },
    type:
      { 
        type:String,
        enum: 
        [
            "auto",
            "moto",
            "camioneta",
            "camión/truck"
        ],
        default: "auto",
        required: [true,"Este campo es requerido"]  
      },
    brandModel:
      { type:String },
    color:
      { type:String },
    isExternal:
      { 
        type:Boolean,
        default:false 
      },
    company:
      {         
        type:mongoose.Schema.ObjectId,
        required: [function () { return !this.isExternal },"Este campo es requerido"]
      },
    isActive:
      { 
        type:Boolean,
        default:true
      },
    isAvailable:
      { 
        type:Boolean,
        default:true 
      },
    documents:
      { 
        type:{DocumentSchema} 
      }
    
});


//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       properties: 
 *         plateNumber:
 *           type: "string"
 *         type:
 *           type: "string"
 *         brandModel:
 *           type: "string"
 *         color:
 *           type: "string"
 *         isExternal:
 *           type: "boolean"
 *         company:
 *           type: "mongoose.schema.objectid"
 *         isActive:
 *           type: "boolean"
 *         isAvailable:
 *           type: "boolean"
 *         documents:
 *           type: "object"
 *       required:
 *         - plateNumber
 *         - type
 */

module.exports = mongoose.model('Vehicle',VehicleSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

