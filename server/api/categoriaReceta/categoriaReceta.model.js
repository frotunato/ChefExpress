var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var categoriaRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('CategoriaReceta', categoriaRecetaSchema);