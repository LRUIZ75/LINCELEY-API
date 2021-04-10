"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
//const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const PersonSchema = Schema({
  names: {
    type: String,
    minlength: 2,
    trim: true,
    required: [true, "Este campo es requerido"],
  },
  lastNames: {
    type: String,
    minlength: 2,
    trim: true,
    required: [true, "Este campo es requerido"],
  },
  citizenId: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "Este campo es requerido"],
    description: "citizenship identification number"
  },
  picture: {
    type: String,
  },
  phone: {
    type: String
  },
  mobile: {
    type: String,
    required: [true, "Este campo es requerido"],
  },
  birthdate: {
    type: String,
    format: "yyyy-MM-dd",
  },
  homeAddress: {
    type: String,
  },
  isUser: {
    type: Boolean,
    default: false,
  },
  isEmployee: {
    type: Boolean,
    default: false,
  },
  isClient: {
    type: Boolean,
    default: false,
  }
});

PersonSchema.virtual("fullName").get(function () {
  return this.names + " " + this.lastnames;
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
 *         lastNames:
 *           type: "string"
 *         citizenId:
 *           type: "string"
 *           example: "001-151274-00574"
 *           description: "citizenship identification number"
 *         picture:
 *           type: "string"
 *           example: "imagen.jpg"
 *         phone:
 *           type: "string"
 *         mobile:
 *           type: "string"
 *         birthdate:
 *           type: "string"
 *           format: "date"
 *         homeAddress:
 *           type: "string"
 *         isUser:
 *           type: "boolean"
 *           default: false
 *         isEmployee:
 *           type: "boolean"
 *           default: false
 *         isClient:
 *           type: "boolean"
 *           default: false
 *       required:
 *         - names
 *         - lastNames
 *         - citizenId
 *         - mobileNumber
 */

module.exports = mongoose.model("Person", PersonSchema);
// mongoDB creará la collección, con documentos de es-tructura del modelo.
