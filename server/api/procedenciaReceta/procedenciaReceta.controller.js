var ProcedenciaReceta = require('./procedenciaReceta.model');

exports.index = function (req, res) {
  ProcedenciaReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, procedenciasReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(procedenciasReceta);
    });
};

exports.create = function (req, res) {
  ProcedenciaReceta.create(req.body, function (err, procedenciaReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(procedenciaReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}