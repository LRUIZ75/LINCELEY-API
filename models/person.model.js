﻿'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const PersonSchema = Schema({
    names:
      { 
        type: String,
        minlength: 2,
        match: "[A-Za-z ]+",
        trim: true,
        required: [true,"Este campo es requerido"]
      },
    lastnames:
      { 
        type: String,
        minlength: 2,
        match: "[A-Za-z ]+", 
        trim: true,
        required: [true,"Este campo es requerido"] 
      },
    personalId:
      { type:String },
    picture:
      { 
        type:String,
        required: [true,"Este campo es requerido"] 
      },
    mobileNumber:
      { 
        type:String,
        required: [true,"Este campo es requerido"] 
      }
    
});

PersonSchema.virtual('fullName').get(function () {
  return this.names + ' ' + this.lastnames;
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       properties: 
 *         names:
 *           type: "string"
 *         lastnames:
 *           type: "string"
 *         personalId:
 *           type: "string"
 *           example: "Cedula"
 *         picture:
 *           type: "string"
 *           example: "imagen.jpg"
 *         mobileNumber:
 *           type: "string"
 *       required:
 *         - names
 *         - lastNames
 *         - personalId
 *         - picture
 *         - mobileNumber
 */

module.exports = mongoose.model('Person',PersonSchema);
// mongoDB creará la collección, con documentos de es-tructura del modelo.
