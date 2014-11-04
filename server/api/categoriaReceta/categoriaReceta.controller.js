var CategoriaReceta = require('./categoriaReceta.model');

exports.index = function (req, res) {
  CategoriaReceta
    .find()
    .select('-__v')
    .lean()
    .exec(function (err, categoriasReceta) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(categoriasReceta);
    });
};

exports.create = function (req, res) {
  CategoriaReceta.create(req.body, function (err, categoriaReceta) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(categoriaReceta);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}