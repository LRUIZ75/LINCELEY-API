'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

var ServicesSchema = new Schema({
  employeeLeasing: {
    type: Boolean,
    default: false,
    required: true
  },
  deliveryRoute: {
    type: Boolean,
    default: false,
    required: true
  },
  shippingOrder: {
    type: Boolean,
    default: true,
    required: true
  }
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const ClientSchema = Schema({
  alias:
    { 
      type: String,
      required: [true, "Este campo es requerido"], 
      unique:true
    },
  type:
  {
    type: String,
    default: "DC",
    enum: [
      "DC",
      "PERSON"
    ],
    required: [true, "Este campo es requerido"]
  },
  distributionCenter:
    { type: mongoose.Schema.ObjectId },
  isReceiver:
    { 
      type: Boolean,
      defatult:false 
    },
  person:
    { type: mongoose.Schema.ObjectId },
  services:
    { type: {ServicesSchema} }

});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Services:
 *       properties: 
 *         employeeLeasing:
 *           type: "boolean"
 *         deliveryRoute:
 *           type: "boolean"
 *         shippingOrder:
 *           type: "boolean"
 *       required:
 *         - employeeLeasing
 *         - deliveryRoute
 *         - shippingOrder
*/
/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       properties: 
 *         alias:
 *           type: "string"
 *         type:
 *           type: "string"
 *         distributionCenter:
 *           type: "string"
 *           format: "ObjectId"
 *         isReceiver:
 *           type: "boolean"
 *         person:
 *           type: "string"
 *           format: "ObjectId"
 *         services:
 *           $ref: "#/components/schemas/Services"
 *       required:
 *         - alias
 *         - type
 *
 */

module.exports = mongoose.model('Client', ClientSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

