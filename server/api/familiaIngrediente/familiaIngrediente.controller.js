var FamiliaIngrediente = require('./familiaIngrediente.model');

exports.index = function (req, res) {
  FamiliaIngrediente
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, familiasIngrediente) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(familiasIngrediente);
    });
};

exports.create = function (req, res) {
  FamiliaIngrediente.create(req.body, function (err, familiaIngrediente) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(familiaIngrediente);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}