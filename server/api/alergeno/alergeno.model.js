var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var alergenoSchema = new Schema({
  nombre: {type: String, required: true}
});

module.exports = mongoose.model('Alergeno', alergenoSchema);