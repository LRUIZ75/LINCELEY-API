'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


var LocationSchema = new Schema({
    lat: {
        type: String,
        required: true,
        validate: 
        {
          /*validator: function(v) 
          {
              return /^(\+|-)?((\d((\.)|\.\d{1, 6})?)|(0*?[0-8]\d((\.)|\.\d{1, 6})?)|(0*?90((\.)|\.0{1, 6})?))$/.test(v);
          },
          message: "Invalid value"*/
          validator: function(v)
          {
            return (isFinite(v) && (Math.abs(v) <= 90))
          },          
          message: "Invalid value"
        },
    },
    lng: {
        type: String,
        required: true,
        validate: 
        {
          validator: function(v) 
          {
              return /^(\+|-)?((\d((\.)|\.\d{1, 6})?)|(0*?\d\d((\.)|\.\d{1, 6})?)|(0*?1[0-7]\d((\.)|\.\d{1, 6})?)|(0*?180((\.)|\.0{1, 6})?))$/.test(v);
          },
          message: "Invalid value"          

        },
    }
  });

  //ToDo: Una vez generado, estos modelos requeren modificación manual para ajustar sus propiedades y validaciones!!!
/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       properties: 
 *         lat:
 *           type: "string"  
 *         lng:
 *           type: "string"
 *       required: 
 *         - lat
 *         - lng
 */

module.exports = mongoose.model('GeoLocation', LocationSchema);