var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var familiaSchema = new Schema({
  nombre: {type: String, required: true},
  tipo: {type: String, enum: ['ingredientes', 'recetas'], required: true}
});


module.exports = mongoose.model('Familia', familiaSchema);