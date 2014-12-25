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
      FamiliaIngrediente.update({_id: element._id}, {$set: element});
    });
    
    return res.status(201).json({msg: 'updated successfully'});
    });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}