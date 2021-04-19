'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

var DocumentComparisonSchema = new Schema({
  licenseCard: {
      type: String      
  },
  insuranceCard: {
      type: String      
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
    person:
      { 
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true,"Este campo es requerido"] 
      },
    company:
      { 
        type:Schema.Types.ObjectId,
        ref: 'Company',
        required: [true,"Este campo es requerido"]
      },
    employee:
    {
      type:mongoose.Schema.ObjectId
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
    licenseCard: {
        type: String,
        required: true
    },
    insuranceCard: {
        type: String,
        required: true
    },
    documentsComparison:
      { 
        type:{DocumentComparisonSchema} 
      }
    
});


/**
 * @swagger
 * components:
 *   schemas:
 *     DocumentComparison:
 *       properties:
 *         licenseCard:
 *           type: "string"
 *         insuranceCard:
 *           type: "string"                 
 *         isOk:
 *           type: "boolean"
 *        
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       properties:
 *         isExternal:
 *           type: "boolean"         
 *         person:
 *           type: "string"
 *           format: "ObjectId"
 *         company:
 *           type: "string"
 *           format: "ObjectId"    
 *         employee:
 *           type: "string"  
 *           format: "ObjectId"     
 *         isActive:
 *           type: "boolean"
 *         isAvailable:
 *           type: "boolean"
 *         licenseCard:
 *           type: "string"
 *         insuranceCard:
 *           type: "string"
 *         documentsComparison:
 *           $ref: "#/components/schemas/DocumentComparison"  
 *       required:
 *         - person
 *         - licenseCard
 *         - insuranceCard
 *               
 *
 */

module.exports = mongoose.model('Driver',DriverSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

