'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const PersonSchema = Schema({
    names:
      { type: String },
    lastnames:
      { type: String },
    personalId:
      { type:mongoose.Schema.ObjectId },
    picture:
      { type:String },
    mobileNumber:
      { type:String }
    
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
 *           type: "objectid"
 *         picture:
 *           type: "string"
 *         mobileNumber:
 *           type: "string"
 *
 */

module.exports = mongoose.model('Person',PersonSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

