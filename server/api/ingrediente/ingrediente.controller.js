'use strict';

var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');

// Get list of Ingredientes
exports.index = function(req, res) {
  Ingrediente
    .find({}) 
    .select('nombre estado familia alergeno') 
    .select({precio: {$slice: -1}})
    .exec(function (err, ingredientes) {
      if(err) { return handleError(res, err); }
        return res.status(200).send(ingredientes);
    });
};

// Get a single Ingrediente
exports.show = function(req, res) {
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
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
  /*
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if (err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    var updated = _.merge(ingredientes, req.body);
   
    console.log('ENTRADA ' + JSON.stringify(req.body) + ' FIN ENTRADA');
    console.log('BD ' + JSON.stringify(ingredientes) + ' FIN BD');

    console.log('MERGE ' + JSON.stringify(updated) + ' FIN MERGE');
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(ingredientes);
    });
  });
  */
  Ingrediente.findByIdAndUpdate(req.params.id, req.body ,function (err, ingredientes) {
    console.log(ingredientes)
    return res.status(200).json(ingredientes);
  })
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