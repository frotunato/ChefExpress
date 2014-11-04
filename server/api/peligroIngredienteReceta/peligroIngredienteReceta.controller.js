var PeligroIngredienteReceta = require('./peligroIngredienteReceta.model');

exports.index = function (req, res) {
  PeligroIngredienteReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, peligrosIngredienteReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(peligrosIngredienteReceta);
    });
};

exports.create = function (req, res) {
  PeligroIngredienteReceta.create(req.body, function (err, peligroIngredienteReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(peligroIngredienteReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}