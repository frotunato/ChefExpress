var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var familiaRecetaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('FamiliaReceta', familiaRecetaSchema);