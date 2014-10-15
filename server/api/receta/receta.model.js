var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var recetaSchema = new Schema({
  nombre: {type: String, required: true},
  categoria: {type: String, required: true},
  familia: {type: String, required: true},
  ambito: {type: String, required: true},
  tipo: {type: String, required: true},
  procedencia: {type: String, required: true},
  ingredientes: [{type: Schema.Types.ObjectId, ref: 'Ingrediente', required: false}],
  precio: {type: Number, required: true},
  cantidad: {type: Number, require: true}
});

module.exports = mongoose.model('Receta', recetaSchema);