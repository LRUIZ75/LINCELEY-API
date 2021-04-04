﻿'use strict'

const mongoose = require('mongoose');
const validator = require('validator');
const location = require('./location.model');
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
    location:
      { type:{location} }
    
});

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

