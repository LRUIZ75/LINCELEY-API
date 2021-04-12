"use strict";

const mongoose = require("mongoose");
const validator = require("validator");

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const ServiceScheduleSchema = Schema({
  vehicle: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Este campo es requerido"],
  },
  serviceStatus: {
    type: String,
    enum: [
      "AVAILABLE",
      "SERVICING", //MANTENIMIENTO
      "ON-DUTY", //DE SERVICIO
    ],
    required: [true, "Este campo es requerido"],
  },
  startDate: {
    type: Date,
    default: Date.now(),
    required: [true, "Este campo es requerido"],
  },
  term: {
    type: String,
    description: "duration of status",
    validate: {
      validator: function (v) {
        return /^[0-9]+[hdwmy]{1}$/.test(v);
      },
      message: "Invalid term",
    },
    default: "1d",
    required: [true, "Este campo es requerido"],
  },
  repeatEvery: {
    type: String,
    default: "0d",
    validate: {
      validator: function (v) {
        return /^[0-9]+[dwmy]{1}$/.test(v);
      },
      message: "Invalid repeat interval",
    },
  },
  comments: { type: String },
  isActive: {
    type: Boolean,
    default: true,
  },
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceSchedule:
 *       properties:
 *         vehicle:
 *           type: "string"
 *           format: "ObjectId"
 *         serviceStatus:
 *           type: "string"
 *           enum: ["AVAILABLE","SERVICING","ON-DUTY"]
 *         startDate:
 *           type: "string"
 *           format: "Date"
 *         term:
 *           type: "string"
 *           description: "duration of status."
 *           example: "0d"
 *         repeatEvery:
 *           type: "string"
 *           description: "interval to repeat status."
 *           example: "0d"
 *         comments:
 *           type: "string"
 *         isActive:
 *           type: "boolean"
 *       required:
 *         - vehicle
 *         - serviceStatus
 *         - startDate
 *         - term
 */

module.exports = mongoose.model("ServiceSchedule", ServiceScheduleSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.
