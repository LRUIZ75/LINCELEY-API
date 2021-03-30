'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

var DocumentSchema = new Schema({
  licenseCard: {
      type: String,
      required: true
  },
  insuranceCard: {
      type: String,
      required: true
  }
});

var DocumentComparisonSchema = new Schema({
  licenseCard: {
      type: String,
      required: true
  },
  insuranceCard: {
      type: String,
      required: true
  },
  isOk: {
      type: Boolean,
      default: true
  }
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const DriverSchema = Schema({
    isExternal:
    { 
      type:Boolean,
      default:false
    },
    employee:
      { 
        type: mongoose.Schema.ObjectId,
        required: [function () { return !this.isExternal },"Este campo es requerido"] 
      },     
    person:
      { 
        type:mongoose.Schema.ObjectId,
        required: [function () { return this.isExternal },"Este campo es requerido"] 
      },
    company:
      { 
        type:mongoose.Schema.ObjectId,
        required: [function () { return this.isExternal },"Este campo es requerido"]
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
      },
    documentsComparison:
      { 
        type:{DocumentComparisonSchema} 
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       properties:
 *         isExternal:
 *           type: "boolean"
 *         employee:
 *           type: "mongoose.schema.objectid"
 *         person:
 *           type: "mongoose.schema.objectid"
 *         company:
 *           type: "mongoose.schema.objectid"          
 *         isActive:
 *           type: "boolean"
 *         isAvailable:
 *           type: "boolean"
 *         documents:
 *           type: "object"
 *         documentsComparison:
 *           type: "object"          
 *
 */

module.exports = mongoose.model('Driver',DriverSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

