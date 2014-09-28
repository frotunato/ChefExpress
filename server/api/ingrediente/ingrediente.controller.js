'use strict';

var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');

// Get list of Ingredientes

exports.index = function(req, res) {
  Ingrediente.find({}, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
      console.log('response');
      return res.status(200).send(ingredientes);
    });
  }; 


// Get a single Ingrediente

exports.show = function(req, res) {
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    console.log('response');
    return res.json(ingredientes);
  });
};

// Creates a new Ingrediente in the DB.
exports.create = function(req, res) {
  Ingrediente.create(req.body, function(err, ingredientes) {
    console.log(req['body'])
    if(err) { return handleError(res, err); }
    return res.status(201).json(ingredientes);
  });
};

// Updates an existing Ingrediente in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
    Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if (err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    var updated = _.merge(ingredientes, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ingredientes);
    });
  });
};

// Deletes a Ingrediente from the DB.
exports.destroy = function(req, res) {
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    Ingrediente.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}