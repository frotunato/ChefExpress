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
  FamiliaIngrediente.create(req.body, function (err, familiaIngrediente) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(201).json(familiaIngrediente);
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
    
    _.forEach(updated, function (element) {
      FamiliaIngrediente.findByIdAndUpdate(element._id, element, function (err, doc) {
        console.log(doc);
      });
    
    });
    
    return res.status(201).json({msg: 'updated successfully'});
  });
};

exports.destroy = function (req, res) {
  console.log(req.body, req.query, req.params);
  FamiliaIngrediente.remove({'_id': {$in: req.body._ids}}, function (err) {
    if (err) return handleError(err);
    return res.status(204).json({msg: 'deleted'});
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}