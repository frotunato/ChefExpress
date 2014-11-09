var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var intoleranciaIngredienteSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('IntoleranciaIngrediente', intoleranciaIngredienteSchema);