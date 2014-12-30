//var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');

exports.index = function (req, res) {
  Ingrediente
    .find()
    .lean()
    .sort(req.query.sort)
    .populate('alergenos familia intolerancias')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      return res.status(200).json({ingredientes: docs});
    });
};

exports.paginate = function (req, res) {
  var sort = JSON.parse(req.query.sort) || {};
  var filter = JSON.parse(req.query.filter) || {};
  filter.nombre = (filter) ? new RegExp(filter.nombre, "i") : undefined;
  Ingrediente
    .find(filter)
    .lean()
    .skip(req.params.max * req.params.page)
    .limit(req.params.max)
    .sort(sort)
    .populate('alergenos familia intolerancias')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      Ingrediente.count(filter, function (err, numDocs) {
        return res.status(200).json({ingredientes: docs, total: numDocs});
      });
    });
};

exports.show = function(req, res) {
  Ingrediente
    .findById(req.params.id)
    .lean()
    .populate('alergenos intolerancias')
    .select('-__v')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      if (!docs) return res.status(404);
      return res.status(200).json(docs);   
    });   
};

exports.create = function(req, res) {
  console.log(JSON.stringify(req.body));
  Ingrediente.create(req.body, function(err, docs) {
    if (err) return handleError(res, err);
    return res.status(201).json();
  });
};

exports.replace = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Ingrediente.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, docs) {
    if (err) return handleError(res, err);
    return res.status(200).json(docs);
  });
};

exports.update = function (req, res) {
  var _ids = req.body.wrapper.map(function (element) {
    return element._id;
  });

  Ingrediente.find({'_id': {$in: _ids}}, function (err, docs) {
    console.log(docs);
    console.log(JSON.stringify(req.body));
    if (err) return handleError(res, err);
    //return res.status(200).json(docs);
    return res.status(204).end();
  });
};

exports.destroy = function(req, res) {
  console.log(req.body, req.query, req.params);
  Ingrediente.remove({'_id': {$in: req.body._ids}}, function (err) {
    if (err) return handleError(err);
    return res.status(204).end();
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}