var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var intoleranciaSchema = new Schema({
  nombre: {type: String, required: true}
});


module.exports = mongoose.model('Intolerancia', intoleranciaSchema);