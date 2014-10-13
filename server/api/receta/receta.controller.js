//var _ = require('lodash');
var Receta = require('./receta.model');

// Get list of Recetas
exports.index = function(req, res) {
  var sorting = {};
  var filtering = {};
  sorting = JSON.parse(req.query.sort);  
  filtering = JSON.parse(req.query.filter);
  console.log(JSON.stringify(filtering));
  
  if(filtering['nombre']) {
    filtering['nombre'] = new RegExp(filtering['nombre'], "i");
  }
  
  Receta
    .find(filtering)
    .limit(req.query.max)
    .skip(req.query.max * req.query.page)
    .sort(sorting)
    .exec(function (err, recetas) {
      if(err) { return handleError(res, err); }
      console.log(recetas.length);
      Receta.count(function (err, c) {
        return res.status(200).json({data: recetas, total: c});        
      });
    });
};

// Get a single Receta
/*
exports.show = function(req, res) {
  Receta.findById(req.params.id, function (err, recetas) {
    if(err) { return handleError(res, err); }
    if(!recetas) { return res.send(404); }
    console.log('response');
    return res.json(recetas);
  });
};
*/

exports.show = function (req, res) {
  Receta
    .findById(req.params.id)
    .populate('ingredientes')
    .exec(function (err, recetas) {
      if (err) {
        return handleError(res, err);
      }
      if (!recetas) {
        return res.send(404);
      }
      return res.status(201).json(recetas);
    });
};

exports.create = function(req, res) {
  Receta.create(req.body, function (err, recetas) {
    console.log(JSON.stringify(req.params));
    if(err) { return handleError(res, err); }
    return res.status(201).json();
  });
};

exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  Receta.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, ingrediente) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingrediente);
  });
};

exports.destroy = function(req, res) {
  Receta.findById(req.params.id, function (err, recetas) {
    if(err) { return handleError(res, err); }
    if(!recetas) { return res.send(404); }
    Receta.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}