var FamiliaIngrediente = require('./familiaIngrediente.model');
var _ = require('lodash');

exports.index = function (req, res) {
  FamiliaIngrediente
    .find()
    .lean()
    .exec(function (err, familiasIngrediente) {
      if(err) {
        return handleError(res, err);
      }
      return res.status(200).json(familiasIngrediente);
    });
};

exports.create = function (req, res) {
  FamiliaIngrediente.collection.insert(req.body, function (err, docs) {
    if (err) return handleError(res, err);
    return res.status(201).json(docs);
  });
};

exports.partialUpdate = function (req, res) {
  var _ids = req.body.map(function (item) {
    return item._id;
  });

  FamiliaIngrediente.find({'_id': {$in: _ids}}, function (err, familiasIngredientes) {
    if (err) return handleError(res, err);
    if (!familiasIngredientes) return res.status(404);
    var updated = _.merge(familiasIngredientes, req.body);
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
  console.log(typeof req.body, req.body)
  
  var _ids = req.body.map(function (element) {
    console.log(element)
    return element._id;
  });
  
  FamiliaIngrediente.remove({'_id': {$in:_ids}}, function (err) {
    if (err) return handleError(err);
    console.log(req.body);
    return res.status(200).json(req.body);
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}