"use strict";

const mongoose = require("mongoose");
const validator = require("validator");

//const document = require('./document.model');
const Schema = mongoose.Schema;

/* const VehicleType = {
  AUTO = 'AUTO',
  MOTO = 'MOTO',
  PICKUPTRUCK = 'PICKUP',
  TRUCK = 'TRUCK',
} */

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const VehicleSchema = Schema({
  plateNumber: {
    type: String,
    required: [true, "Este campo es requerido"],
  },
  vehicleType: {
    type: String,
    enum: ["AUTO", "MOTO", "PICKUP", "TRUCK"],
    default: "AUTO",
    required: [true, "Este campo es requerido"],
  },
  brand: { type: String },
  model: { type: String },
  color: { type: String },
  year: { type: Number },
  isExternal: {
    type: Boolean,
    default: false,
  },
  company: {
    type: mongoose.Schema.ObjectId,
    required: [
      function () {
        return !this.isExternal;
      },
      "Este campo es requerido",
    ],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  registrationCard: {
    type: String,
    required: [true, "Este campo es requerido"],
  },
  insuranceCard: {
    type: String,
    required: [true, "Este campo es requerido"],
  },
  owner: {
    type: String,
    description: "Owner",
  },
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**


/**
 * @swagger
 * components:
 *   schemas:
 *     Vehicle:
 *       properties:
 *         plateNumber:
 *           type: "string"
 *         vehicleType:
 *           type: "string"
 *         brand:
 *           type: "string"
 *         model:
 *           type: "string"
 *         year:
 *           type: "number"
 *         color:
 *           type: "string"
 *         isExternal:
 *           type: "boolean"
 *           default: "false"
 *         company:
 *           type: "string"
 *           format: "ObjectId"
 *         isActive:
 *           type: "boolean"
 *           default: "true"
 *         isAvailable:
 *           type: "boolean"
 *           default: "false"
 *         registrationCard:
 *           type: "string"
 *         insuranceCard:
 *           type: "string"
 *         owner:
 *           type: "string"
 *           format: "ObjectId"
 *           description: "Person OID"
 *       required:
 *         - plateNumber
 *         - type
 *         - company
 *         - registrationCard
 *         - insuranceCard
 */

module.exports = mongoose.model("Vehicle", VehicleSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.
