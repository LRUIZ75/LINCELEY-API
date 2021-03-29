'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const UserSchema = Schema({
    name:
      { type: String },
    email:
      { type: String },
    salt:
      { type: String },
    password:
      { type:String },
    emailverified:
      { type:Boolean },
    isActive:
      { type:Boolean },
    roles:
      {type: [mongoose.Schema.ObjectId]},
    person:
      { type:mongoose.Schema.ObjectId }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties: 
 *         name:
 *           type: "string"
 *         email:
 *           type: "string"
 *         salt:
 *           type: "string"
 *         password:
 *           type: "string"
 *         emailverified:
 *           type: "boolean"
 *         isActive:
 *           type: "boolean"
 *         roles:
 *           type: "array"
 *           items:
 *             type: "string"
 *         person:
 *           type: "string"
 */

module.exports = mongoose.model('User',UserSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

