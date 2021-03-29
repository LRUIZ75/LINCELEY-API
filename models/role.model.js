'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const RoleSchema = Schema({
    names:
      { type: String },
    isActive:
      { type: Boolean },
    description:
      { type:String }
    
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       properties: 
 *         names:
 *           type: "string"
 *         isActive:
 *           type: "boolean"
 *         description:
 *           type: "string"
 *
 */

module.exports = mongoose.model('Role',RoleSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

