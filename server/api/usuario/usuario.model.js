var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({
  nombre: {type: String, required: true, trim: true},
  contraseña: {type: String, required: true, trim: true},
});

module.exports = mongoose.model('Usuario', usuarioSchema);