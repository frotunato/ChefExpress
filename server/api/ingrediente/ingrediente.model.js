var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ingredienteSchema = new Schema({
  nombre: {type: String, required: true, trim: true},
  familia: {type: Schema.Types.ObjectId, ref: 'FamiliaIngrediente', required: false},
  alergenos: [{type: Schema.Types.ObjectId, ref: 'AlergenoIngrediente', required: false}],
  intolerancias: [{type: Schema.Types.ObjectId, ref: 'IntoleranciaIngrediente', required: false}],
  precio: {type: Number, min: 0, default: 0},
  perecedero: {type: String, default: 'No'},
  unidad: {type: String},
  pcons: {type: Number, max: 1, min: 0, default: 1},
  conversionKg: {type:Number, min: 0, default: 1},
  calorias: {type: Number, default: 0, min: 0},
  proteinas: {type: Number, default: 0, min: 0},
  grasas: {type: Number, default: 0, min: 0},
  carbohidratos: {type: Number, default: 0, min: 0}
});

module.exports = mongoose.model('Ingrediente', ingredienteSchema);