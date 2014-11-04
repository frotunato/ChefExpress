var FamiliaReceta = require('./familiaReceta.model');

exports.index = function (req, res) {
  FamiliaReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, familiasReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(familiasReceta);
    });
};

exports.create = function (req, res) {
  FamiliaReceta.create(req.body, function (err, familiaReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(familiaReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}