var _ = require('lodash');
var async = require('async');
var Model = require('./ingrediente.model');
var checkIdRegExp = new RegExp("^[0-9a-fA-F]{24}$");
/*
exports.index = function (req, res) {
  var sortCriteria = req.query.sort || {nombre: 'asc'};
  Model
    .find()
    .lean()
    .sort(sortCriteria)
    .populate('alergenos familia intolerancias')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      return res.status(200).json({ingredientes: docs});
    });
};
*/
exports.paginate = function (req, res) {
  var sortCriteria = (req.query.sort) ? JSON.parse(req.query.sort) : {nombre: 'asc'};
  var filterCriteria = (req.query.filter) ? JSON.parse(req.query.filter) : {};
  filterCriteria.nombre = (filterCriteria) ? new RegExp(filterCriteria.nombre, "i") : undefined;
  Model
    .find(filterCriteria)
    .lean()
    .skip(req.query.max * req.query.page)
    .limit(req.query.max)
    .sort(sortCriteria)
    .populate('alergenos familia intolerancias')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      Model.count(filterCriteria, function (err, numDocs) {
        return res.status(200).json({ingredientes: docs, total: numDocs});
      });
    });
};

exports.show = function(req, res) {
  if (!req.params._id.match(checkIdRegExp)) return res.status(400).end();
  Model
    .findById(req.params.id)
    .lean()
    .populate('alergenos intolerancias')
    .select('-__v')
    .exec(function (err, docs) {
      if (err) return handleError(res, err);
      if (!docs) return res.status(404).end();
      return res.status(200).json(docs);   
    });   
};

exports.create = function(req, res) {
  console.log(JSON.stringify(req.body));
  Model.create(req.body, function(err, docs) {
    if (err) return handleError(res, err);
    return res.status(201).json();
  });
};

exports.replace = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Model.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, docs) {
    if (err) return handleError(res, err);
    return res.status(200).json(docs);
  });
};

exports.update = function (req, res) {
  console.log(req.body, req.params);
  Model.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, docs) {
    console.log(docs);
    if (err) return handleError(res, err);
    return res.status(200).end();
  });
};

exports.updateCollection = function (req, res) {
  var errors = [];
  console.log(req.body);
  var elementsWithIds = (Array.isArray(req.body)) ? _.filter(req.body, function (element) {
    return element._id && element._id.match(checkIdRegExp);
  }) : [];
  async.each(elementsWithIds, function (element, callback) {
    Model.findById(element._id, function (err, doc) {
      if (!doc) return errors.push('Invalid _id ' + element._id) && callback();
      delete element._id;
      _.merge(doc, element).save(function () {
        callback();
      });
    });
  }, function (err) {
    if (errors.length > 0) return res.status(404).json(errors);
    return res.status(200).end();
  });
};

exports.destroy = function (req, res) {
  console.log(req.body, req.query, req.params);
  Model.remove({'_id': {$in: req.body._ids}}, function (err) {
    if (err) return handleError(err);
    return res.status(204).end();
  });
};

exports.destroyCollection = function (req, res) {
  var _ids = (Array.isArray(req.body)) ? _.map(req.body, function (element) {
    if (element._id && element._id.match(checkIdRegExp)) {
      return element._id;
    }
  }) : [];

  Model.remove({'_id': {$in: _ids}}, function (err) {
    if (err) return handleError(err);
    console.log(req.body);
    return res.status(204).end();
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}