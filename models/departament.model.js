﻿'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const DepartamentSchema = Schema({
    name:
      { 
        type: String,
        minlength: 5,
        maxlength: 12,
        match: "[A-Za-z][A-Za-z0-9]+",
        required: [true,"Este campo es requerido"] 
      },
    company:
      { 
        type:mongoose.Schema.ObjectId,
        required: [true,"Este campo es requerido"] 
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
 *     Departament:
 *       properties: 
 *         name:
 *           type: "string"
 *         company:
 *           type: "mongoose.schema.objectid"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - name
 *         - company
 */

module.exports = mongoose.model('Departament',DepartamentSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.
