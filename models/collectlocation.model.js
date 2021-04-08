'use strict'

const mongoose = require('mongoose');
const validator = require('validator');
//const location = require('./location.model');
const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const CollectLocationSchema = Schema({
    client:
      { 
        type: mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"]  
      },
    alias:
      { type:String },
    fullAddress:
      { 
        type:String,
        required: [true,"Este campo es requerido"]  
      },
    city:
      { type:String },
    state:
      { type:String },
    country:
      { type:String },
    postalCode:
      { 
        type:String,
        required: [true,"Este campo es requerido"]  
      },
    location: {
        lat: {
          type: Number,
          default: 0,
          validate:
          {          
           validator: function (v) {
                return  (isFinite(v) && (Math.abs(v) <= 90));
            },
            message: "Invalid value"
          }
        },
        lng: {
          type: Number,
          default: 0,
          validate:
          {          
           validator: function (v) {
                return (isFinite(v) && (Math.abs(v) <= 180));
            },
            message: "Invalid value"
          }
        }
      }
    
    });
    
    // La función de validación para actualizacion:
    const updateValidation = function(next) {
      let update = this.getUpdate();
      if(Object.entries(update).length) {
        if(update.$set) {
          if ((isFinite(update.$set.location.lat) && (Math.abs(update.$set.location.lat) <= 90)) 
          && (isFinite(update.$set.location.lng) && (Math.abs(update.$set.location.lng) <= 180)))
          {
            //return next;
          }
          else 
          {
            return next(new Error('location invalid values'));
          }      
        }     
      }
      return next();
    }
    
    // la declaración de middleware:
    CollectLocationSchema.pre('update', updateValidation);
    CollectLocationSchema.pre('updateOne', updateValidation);
    CollectLocationSchema.pre('findOneAndUpdate', updateValidation); // incluye findByIdAndUpdate
    
    //ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
    /**
     * @swagger
     * components:
     *   schemas:
     *     Location:
     *       properties:
     *         lat:
     *           type: "number"
     *         lng:
     *           type: "number"
     *       required:
     *         - lat
     *         - lng
     */
    

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     CollectLocation:
 *       properties: 
 *         client:
 *           type: "string"
 *           format: "ObjectId"
 *         alias:
 *           type: "string"
 *         fullAddress:
 *           type: "string"
 *         city:
 *           type: "string"
 *         state:
 *           type: "string"
 *         country:
 *           type: "string"
 *         postalCode:
 *           type: "string"
 *         location:
 *           $ref: "#/components/schemas/Location"
 *       required:
 *         - client
 *         - fullAddress
 *         - postalCode
 */

module.exports = mongoose.model('CollectLocation',CollectLocationSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

