var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recetaSchema = new Schema({
  nombre: {type: String, required: true},
  categoria: {type: String, required: false},
  familia: {type: String, required: false},
  ambito: {type: String, required: false},
  tipo: {type: String, required: false},
  procedencia: {type: String, required: false},
  tratamiento: {type: String, required: false, default: 'Ninguno'},
  ingredientes: [{
    ingrediente: {type: Schema.Types.ObjectId, ref: 'Ingrediente', required: false},
    cantidad: {type: Number, required: false, default: 0, min: 0},
  }],
  precio: {type: Number, required: false},
  cantidad: {type: Number, require: false},
  raciones: {type: Number, require: false, default: 1, min: 1}
});

module.exports = mongoose.model('Receta', recetaSchema);