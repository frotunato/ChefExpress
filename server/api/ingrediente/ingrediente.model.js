'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var ingredienteSchema = new Schema({
  nombre: {type: String, required: true},
  estado: {type: String, required: true},
  familia: String,
  alergeno: String,
  precio: {type: Number, min: 0, default: 0},
  composicion: {
    calorias: {type: Number, default: 0, min: 0},
    proteinas: {type: Number, default: 0, min: 0},
    grasas: {type: Number, default: 0, min: 0},
    carbohidratos: {type: Number, default: 0, min: 0}
  }
});


module.exports = mongoose.model('Ingrediente', ingredienteSchema);