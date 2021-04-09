// Last Updated: 9/4/2021 16:48:54
// Updated By  : @YourName
'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
const PaymentMethodSchema = Schema({
  client:
  {
    type: mongoose.Schema.ObjectId,
    required: [true, "Este campo es requerido"]
  },
  paymentType:
  {
    type: String,
    enum: [
      "CASH ON RECEPTION",
      "CREDIT CARD",
      "BANK TRANSFER",
      "PAYPHONE"
    ],
    required: [true, "Este campo es requerido"]
  },
  cardData:
  {
    number:
    {
      type: String,
      required: [true, "Este campo es requerido"]
    },
    type:
    {
      type: String,
      enum: [
        "VISA",
        "MASTERCARD",
        "DISCOVER",
        "DINERS CLUB",
        "AMERICA EXPRESS"
      ],
      default: "VISA",
      required: [true, "Este campo es requerido"]
    },
    cvvCID:
    {
      type: String,
      validate:
      {
        validator: function (v) {
          return /^[0-9]{3}[0-9]?$/.test(v);
        },
        message: "Invalid name"
      },
      trim: true
    },
    nameOnCard:
    {
      type: String,
      minlength: 10,
      required: true
    },
    expiresOn:
    {
      type: String,
      required: [true, "Este campo es requerido"]
    }
  },
  bankXferData:
  {
    bank: {
      type: String,
      required: true
    },
    swiftCode: {
      type: String,
      minlength: 8,
      maxlength: 11
    },
    accountNumber: {
      type: String,
      required: true
    }
  }
});

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     CardData:
 *       properties:
 *         number:
 *           type: "string"
 *         type:
 *           type: "string"
 *         cvvCID:
 *           type: "string"
 *         nameOnCard:
 *           type: "string"
 *         expiresOn:
 *           type: "string"
 *       required:
 *         - number
 *         - type
 *         - nameOnCard
 *         - expiresOn
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BankXferData:
 *       properties:
 *         bank:
 *           type: "string"
 *         swiftCode:
 *           type: "string"
 *         accountNumber:
 *           type: "string"          
 *       required:
 *         - bank
 *         - accountNumber
 */

//ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentMethod:
 *       properties: 
 *         client:
 *           type: "string"
 *           format: "ObjectId"
 *         paymentType:
 *           type: "string"
 *         cardData:
 *           $ref: "#/components/schemas/CardData"
 *         bankXferData:
 *           $ref: "#/components/schemas/BankXferData"
 *
 */

module.exports = mongoose.model('PaymentMethod',PaymentMethodSchema);
// mongoDB creará la collección, con documentos de estructura del modelo.

