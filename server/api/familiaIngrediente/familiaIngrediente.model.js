var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var familiaIngredienteSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('FamiliaIngrediente', familiaIngredienteSchema);