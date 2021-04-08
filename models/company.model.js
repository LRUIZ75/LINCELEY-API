"use strict";

const mongoose = require("mongoose");
const validator = require("validator");
//const location = require('./location.model');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const CompanySchema = Schema({
  fullName: {
    type: String,
    unique: true,
    minlength: 2,
    required: [true, "Este campo es requerido"],
  },
  shortName: {
    type: String,
    required: [true, "Este campo es requerido"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  location: {
    lat: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return isFinite(v) && Math.abs(v) <= 90;
        },
        message: "Invalid value",
      },
    },
    lng: {
      type: Number,
      default: 0,
      validate: {
        validator: function (v) {
          return isFinite(v) && Math.abs(v) <= 180;
        },
        message: "Invalid value",
      },
    },
  },
});

// La función de validación para actualizacion:
const updateValidation = function (next) {
  let update = this.getUpdate();
  if (Object.entries(update).length) {
    if (update.$set) {
      if (update.$set.location) {
        if (update.$set.location.lat) {
          if (!update.$set.location.lng)
            return next(new Error("location lng missing value"));
          if (
            !(
              isFinite(update.$set.location.lat) &&
              Math.abs(update.$set.location.lat) <= 90
            )
          )
            return next(new Error("location lat invalid values"));
        }
        if (update.$set.location.lng) {
          if (!update.$set.location.lat)
            return next(new Error("location lat missing value"));
          if (
            !(
              isFinite(update.$set.location.lng) &&
              Math.abs(update.$set.location.lng) <= 180
            )
          )
            return next(new Error("location lng invalid values"));
        }
      }
    }
  }
  return next();
};

// la declaración de middleware:
CompanySchema.pre("update", updateValidation);
CompanySchema.pre("updateOne", updateValidation);
CompanySchema.pre("findOneAndUpdate", updateValidation); // incluye findByIdAndUpdate

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       properties:
 *         lat:
 *           type: "number"
 *         lng:
 *           type: "number"
 *       required:
 *         - lat
 *         - lng
 */

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       properties:
 *         fullName:
 *           type: "string"
 *           minLength: 2
 *         shortName:
 *           type: "string"
 *         isActive:
 *           type: "boolean"
 *         location:
 *           $ref: "#/components/schemas/Location"
 *       required:
 *         - fullName
 *         - shortName
 */

module.exports = mongoose.model("Company", CompanySchema);
// mongoDB creará la collección, con documentos de estructura del modelo.
