var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var procedenciaSchema = new Schema({
  nombre: {type: String, required: true},
  tipo: {type: String, enum: ['ingredientes', 'recetas'], required: true, index: true}
});


module.exports = mongoose.model('Procedencia', procedenciaSchema);