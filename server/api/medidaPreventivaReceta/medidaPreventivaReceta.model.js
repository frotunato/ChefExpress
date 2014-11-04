var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var medidaPreventivaRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('MedidaPreventivaReceta', medidaPreventivaRecetaSchema);