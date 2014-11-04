var MedidaPreventivaReceta = require('./medidaPreventivaReceta.model');

exports.index = function (req, res) {
  MedidaPreventivaReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, medidasPreventivasReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(medidasPreventivasReceta);
    });
};

exports.create = function (req, res) {
  MedidaPreventivaReceta.create(req.body, function (err, medidaPreventivaReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(medidaPreventivaReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}