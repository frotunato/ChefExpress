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

/*
exports.pagination = function (req, res) {
  Ingrediente.find({}, function (err, ingredientes) {
    if(err) return handleError(res, err);
    if(!ingredientes) return res.send(404);
    console.log(ingredientes[20])
    var index = req.params.maxItems * req.params.page;
    var bottom = ingredientes[index - 1];
    var top = ingredientes[index + req.params.maxItems - 1];

    var result = ingredientes.slice(bottom, top);
    console.log(JSON.stringify(result), 'index ' + index, result.length, ingredientes.length)
    return res.json(result);
  });
};
*/

exports.pagination = function (req, res) {
  Ingrediente.find()
  .limit(req.params.maxItems)
  .skip(req.params.maxItems * req.params.page)
  .sort({
    nombre: 'asc'
  })
  .exec(function (err, ingredientes) {
    Ingrediente.count(function (err, c) {
      return res.json({data: ingredientes, total: c});
    });
  });
};

exports.showFiltered = function (req, res) {
  console.log(req.params)
  Ingrediente.find({ 'nombre': new RegExp('^' + req.params.nombre + '$', "i")}, function (err, ingredientes) {
    if(err) { return handleError(res,err);}
    if(!ingredientes) { return res.send(404);}
    console.log('SOMETHING', ingredientes.length);
    return res.json(ingredientes);
  });
};


// Get a single Ingrediente
exports.show = function(req, res) {
  console.log('MOSTRANDO UNO POR ID')
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

exports.updateField = function (req, res) {
  if(req['body']['_id']) { delete req['body']['_id']; }
  Ingrediente.find
}

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