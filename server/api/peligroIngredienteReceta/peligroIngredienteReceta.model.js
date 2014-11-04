var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var peligroIngredienteRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('PeligroIngredienteReceta', peligroIngredienteRecetaSchema);