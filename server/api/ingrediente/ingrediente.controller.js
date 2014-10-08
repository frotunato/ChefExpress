//var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');

// Get list of Ingredientes

exports.index = function(req, res) {
  console.log(JSON.stringify(req.query))
  console.log('original', req.query.filter, 'sorting', req.query.sort)
  var sorting = {};  
  var filtering = {};
  filtering = JSON.parse(req.query.filter);
  sorting = JSON.parse(req.query.sort);
  //filtering[req.query.filterByField] = req.query.filterCriteria;
  
  if(filtering['nombre']) {
    filtering['nombre'] = new RegExp(filtering['nombre'], "i");
  }
  
  Ingrediente
    .find(filtering)
    .limit(req.query.max)
    .skip(req.query.max * req.query.page)
    .sort(sorting)
    .exec(function (err, ingredientes) {
      if(err) { return handleError(res, err); }
      console.log(ingredientes.length)
      Ingrediente.count(filtering, function (err, c) {
        return res.status(200).json({data: ingredientes, total: c});        
      });
    });
}

// Get a single Ingrediente
exports.show = function(req, res) {
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    console.log('response');
    return res.json(ingredientes);
  });
};

exports.create = function(req, res) {
  Ingrediente.create(req.body, function(err, ingredientes) {
    console.log(req['body'])
    if(err) { return handleError(res, err); }
    return res.status(201).json();
  });
};

/*
exports.update = function(req, res) {
  console.log(JSON.stringify(req.body))
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
*/

exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingrediente.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, ingrediente) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingrediente);
  })
}


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