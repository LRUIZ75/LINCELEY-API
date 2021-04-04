'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const ServiceScheduleSchema = Schema({
    startSchedule:
      { 
        type: Date,
        default: Date.now(),
        required: [true,"Este campo es requerido"]  
      },
    duration:
      { 
        type:String, 
        validate: 
        {
          validator: function(v) 
          {
              return /^[0-9]+[hdwmy]{1}$/.test(v);
          },
          message: "Invalid duration"
        },
        default: "1d",
        required: [true,"Este campo es requerido"]
      },
    serviceType:
      { 
        type:String,
        enum: 
        [
          "on duty/de turno",
          "maintenance/mantenimiento",
          "off duty/relevado"
        ], 
        required: [true,"Este campo es requerido"]
      },
    vehicle:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"]
      },
    isRepeatable:
      { 
        type:Boolean,
        default: false
      },
    repeatInterval:
      { 
        type:String, 
        validate: 
        {
          validator: function(v) 
          {
              return /^[0-9]+[hdwmy]{1}$/.test(v);
          },
          message: "Invalid repeatInterval"
        },
        required: [function () { return this.isRepeatable },"Este campo es requerido"] 
      },
    comments:
      { type:String },
    isAvailable:
      { 
        type:Boolean,
        default:true 
      },
    isActive:
      { 
        type:Boolean,
        default: true 
      }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceSchedule:
 *       properties: 
 *         startSchedule:
 *           type: "date"
 *         duration:
 *           type: "string"
 *           example: "9h"
 *         serviceType:
 *           type: "string"
 *         vehicle:
 *           type: "string"
 *           format: "ObjectId"
 *         isRepeatable:
 *           type: "boolean"
 *         repeatInterval:
 *           type: "string"
 *         comments:
 *           type: "string"
 *         isAvailable:
 *           type: "boolean"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - startSchedule
 *         - duration
 *         - serviceType
 *         - vehicle
 */

module.exports = mongoose.model('ServiceSchedule',ServiceScheduleSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

