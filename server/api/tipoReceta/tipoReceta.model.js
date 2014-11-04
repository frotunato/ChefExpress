var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tipoRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('TipoReceta', tipoRecetaSchema);