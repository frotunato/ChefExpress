var AlergenoIngrediente = require('./alergenoIngrediente.model');

exports.index = function (req, res) {
  AlergenoIngrediente
    .find()
    .lean()
    .exec(function (err, alergenosIngrediente) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(alergenosIngrediente);
    });
};

exports.create = function (req, res) {
  AlergenoIngrediente.create(req.body, function (err, alergenoIngrediente) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(alergenoIngrediente);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}