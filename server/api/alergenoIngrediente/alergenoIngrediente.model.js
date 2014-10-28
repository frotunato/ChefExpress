var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var alergenoIngredienteSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('AlergenoIngrediente', alergenoIngredienteSchema);