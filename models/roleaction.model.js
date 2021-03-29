'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const RoleActionSchema = Schema({
    names:
      { type: String },
    role:
      { type: mongoose.Schema.ObjectId },
    isActive:
      { type: Boolean }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     RoleAction:
 *       properties: 
 *         names:
 *           type: "string"
 *         role:
 *           type: "mongoose.schema.objectid"
 *         isActive:
 *           type: "boolean"
 *
 */

module.exports = mongoose.model('RoleAction',RoleActionSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

