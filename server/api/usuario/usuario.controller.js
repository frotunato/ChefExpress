var Usuario = require('./usuario.model');

exports.index = function (req, res) {
  Usuario
    .find()
    .lean()
    .exec(function (err, usuarios) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(usuarios);
    });
};

exports.create = function (req, res) {
  Usuario.create(req.body, function (err, usuario) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(usuario);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}