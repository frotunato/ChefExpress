var TipoReceta = require('./tipoReceta.model');

exports.index = function (req, res) {
  TipoReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, tiposReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(tiposReceta);
    });
};

exports.create = function (req, res) {
  TipoReceta.create(req.body, function (err, tipoReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(tipoReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}