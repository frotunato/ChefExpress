var Model = require('./puntoCritico.model');

exports.index = function (req, res) {
  console.log(req.query);
  Model
    .find(req.query)
    .lean()
    .exec(function (err, docs) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(docs);
    });
};

exports.create = function (req, res) {
  Model.create(req.body, function (err, doc) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(doc);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}