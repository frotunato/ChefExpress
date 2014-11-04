var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var peligroDesarrolloRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('PeligroDesarrolloReceta', peligroDesarrolloRecetaSchema);