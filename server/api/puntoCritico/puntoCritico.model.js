var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var puntoCriticoSchema = new Schema({
  nombre: {type: String, required: true},
  tipo: {type: String, enum: ['peligroDesarrollo', 'peligroIngrediente', 'medidaPreventiva'], required: true, index: true}
}, {collection: 'puntoscriticos'});


module.exports = mongoose.model('PuntoCritico', puntoCriticoSchema);