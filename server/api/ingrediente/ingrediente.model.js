'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IngredienteSchema = new Schema({
  nombre: String,
  estado: String,
  categoria: String,
  alergenos: [String],
  composicion: {
    calorias: {type: Number, min: 0},
    proteinas: {type: Number, min: 0},
    grasas: {type: Number, min: 0},
    carbohidratos: {type: Number, min: 0}
  }
});

module.exports = mongoose.model('Ingrediente', IngredienteSchema);