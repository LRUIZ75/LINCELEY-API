'use strict'

const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;


var LocationSchema = new Schema({
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    }
  });


module.exports = mongoose.model('GeoLocation', LocationSchema);