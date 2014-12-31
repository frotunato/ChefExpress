var Model = require('./familia.model');
var _ = require('lodash');

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
    if (err) return handleError(res, err);
    return res.status(201).json(doc._id);
  });
  /*
  Model.collection.insert(req.body, function (err, docs) {
    if (err) return handleError(res, err);
    return res.status(201).json(docs);
  });
  */
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

  Model.find({'_id': {$in: _ids}}, function (err, docs) {
    if (err) return handleError(res, err);
    if (!docs) return res.status(404);
    var updated = _.merge(docs, req.body);
    var updatedResponse = [];

    var numActions = 0;
    _.forEach(updated, function (element) {
      ++numActions;
      Model.findByIdAndUpdate(element._id, element, function (err, doc) {
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
  
  Model.remove({'_id': {$in:_ids}}, function (err) {
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