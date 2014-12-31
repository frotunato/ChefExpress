var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var tipoSchema = new Schema({
  nombre: {type: String, enum: ['ingredientes', 'recetas'], required: true}
});


module.exports = mongoose.model('Tipo', tipoSchema);