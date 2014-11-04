var PeligroDesarrolloReceta = require('./peligroDesarrolloReceta.model');

exports.index = function (req, res) {
  PeligroDesarrolloReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, peligrosDesarrolloReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(peligrosDesarrolloReceta);
    });
};

exports.create = function (req, res) {
  PeligroDesarrolloReceta.create(req.body, function (err, peligroDesarrolloReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(peligroDesarrolloReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}