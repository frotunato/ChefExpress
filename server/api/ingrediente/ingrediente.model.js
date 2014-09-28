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
    calorias: {type: Number, min: 0, default: 0},
    proteinas: {type: Number, min: 0, default: 0},
    grasas: {type: Number, min: 0, default: 0},
    carbohidratos: {type: Number, min: 0, default: 0}
  }
});


module.exports = mongoose.model('Ingrediente', ingredienteSchema);