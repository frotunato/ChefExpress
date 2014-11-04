var AmbitoReceta = require('./ambitoReceta.model');

exports.index = function (req, res) {
  AmbitoReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, ambitosReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(ambitosReceta);
    });
};

exports.create = function (req, res) {
  AmbitoReceta.create(req.body, function (err, ambitoReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(ambitoReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}