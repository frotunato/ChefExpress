var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recetaSchema = new Schema({
  nombre: {type: String, required: true, trim: true},
  categoria: {type: Schema.Types.ObjectId, ref: 'CategoriaReceta', required: false},
  familia: {type: Schema.Types.ObjectId, ref: 'FamiliaReceta', required: false},
  ambito: {type: Schema.Types.ObjectId, ref: 'AmbitoReceta', required: false},
  tipo: {type: Schema.Types.ObjectId, ref: 'TipoReceta', required: false},
  elaboracion: {type: String, required: false},
  medidasPreventivas: [{type: Schema.Types.ObjectId, ref: 'MedidaPreventivaReceta', required: false}],
  peligrosIngredientes: [{type: Schema.Types.ObjectId, ref: 'PeligroIngredienteReceta', required: false}],
  peligrosDesarrollo: [{type: Schema.Types.ObjectId, ref: 'PeligroDesarrolloReceta', required: false}],
  procedencia: {type: Schema.Types.ObjectId, ref:'ProcedenciaReceta', required: false},
  tratamiento: {type: String, required: false},
  ingredientes: [{
    ingrediente: {type: Schema.Types.ObjectId, ref: 'Ingrediente', required: false},
    cantidad: {type: Number, required: false, default: 0, min: 0},
  }],
  precio: {type: Number, required: false},
  cantidad: {type: Number, require: false},
  raciones: {type: Number, require: false, default: 1, min: 1}
});

module.exports = mongoose.model('Receta', recetaSchema);