var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ambitoRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('AmbitoReceta', ambitoRecetaSchema);