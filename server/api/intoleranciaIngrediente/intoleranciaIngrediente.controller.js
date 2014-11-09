var IntoleranciaIngrediente = require('./intoleranciaIngrediente.model');

exports.index = function (req, res) {
  IntoleranciaIngrediente
    .find()
    //.select('-__v')
    .lean()
    .exec(function (err, intoleranciasIngrediente) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(intoleranciasIngrediente);
    });
};

exports.create = function (req, res) {
  IntoleranciaIngrediente.create(req.body, function (err, intoleranciaIngrediente) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(intoleranciaIngrediente);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}