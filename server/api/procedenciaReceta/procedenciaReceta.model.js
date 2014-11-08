var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var procedenciaRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('ProcedenciaReceta', procedenciaRecetaSchema);