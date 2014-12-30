var FamiliaIngrediente = require('./familiaIngrediente.model');
var _ = require('lodash');

exports.index = function (req, res) {
  FamiliaIngrediente
    .find()
    .lean()
    .exec(function (err, docs) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(docs);
    });
};

exports.create = function (req, res) {
  FamiliaIngrediente.collection.insert(req.body, function (err, docs) {
    if (err) return handleError(res, err);
    return res.status(201).json(docs);
  });
};

exports.replace = function (req, res) {
  console.log(req.body, req.params);
  return res.status(200).json(req.params);
};

exports.update = function (req, res) {
  console.log(req.body);
  var _ids = req.body.map(function (item) {
    return item._id;
  });

/*
devuelve ingrediente solo
api/ingredientes/:id
devuelve alergenos de ingrediente
api/ingredientes/:id/alergenos
devuelve todos los alergenos disponibles
api/ingredientes/alergenos
obtiene alergeno determinado
api/ingredientes/alergenos/:id
*/

  FamiliaIngrediente.find({'_id': {$in: _ids}}, function (err, docs) {
    if (err) return handleError(res, err);
    if (!docs) return res.status(404);
    var updated = _.merge(docs, req.body);
    var updatedResponse = [];
    //callback lanzado cuando _.forEach sincrono termina
    var numActions = 0;
    _.forEach(updated, function (element) {
      ++numActions;
      FamiliaIngrediente.findByIdAndUpdate(element._id, element, function (err, doc) {
        if (err) return handleError(res, err);
        --numActions;
        updatedResponse.push(doc);
        if (numActions === 0) {
          return res.status(201).json(updatedResponse);
        }
      });
    });
  });
};

exports.destroy = function (req, res) {
  var _ids = req.body.map(function (element) {
    return element._id;
  });
  
  FamiliaIngrediente.remove({'_id': {$in:_ids}}, function (err) {
    if (err) return handleError(err);
    console.log(req.body);
    return res.status(204).end();
    //return res.status(200).json(req.body);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}