﻿'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const JobPositionSchema = Schema({
    name:
      { 
        type: String,
        minlength: 5,
        maxlength: 12,
        validate: 
        {
          validator: function(v) 
          {
              return /^([A-Z]|[a-z])[A-Za-z0-9]+$/.test(v);
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
    defaultRole:
      { type:mongoose.Schema.ObjectId },
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
 *     JobPosition:
 *       properties: 
 *         name:
 *           type: "string"
 *         company:
 *           type: "mongoose.schema.objectid"
 *         defaultRole:
 *           type: "mongoose.schema.objectid"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - name
 *         - company
 */

module.exports = mongoose.model('JobPosition',JobPositionSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

