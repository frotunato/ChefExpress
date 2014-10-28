//var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');


exports.index = function(req, res) {
  var sorting = {};  
  var filtering = {};
  filtering = JSON.parse(req.query.filter);
  sorting = JSON.parse(req.query.sort);
  
  if(filtering.nombre) {
    filtering.nombre = new RegExp(filtering.nombre, "i");
  }
  
  Ingrediente
    .find(filtering)
    .skip(req.query.max * req.query.page)
    .limit(req.query.max)
    .sort(sorting)
    .populate('alergenos.alergeno familia')
    .lean()
    .exec(function (err, ingredientes) {
      if(err) { return handleError(res, err); }
      Ingrediente.count(filtering, function (err, c) {
        return res.status(200).json({data: ingredientes, total: c});        
      });
    });
};

exports.show = function(req, res) {
  Ingrediente
    .findById(req.params.id)
    .populate('alergenos.alergeno')
    .lean()
    .exec(function (err, ingrediente) {
      if(err) { return handleError(res, err); }
      if(!ingrediente) { return res.send(404); }
      //console.log('response');
      console.log(JSON.stringify(ingrediente));
      return res.json(ingrediente);   
    });   
};

exports.create = function(req, res) {
  Ingrediente.create(req.body, function(err, ingredientes) {
    //console.log(req.body);
    if(err) { 
      console.log(req.body);
      return handleError(res, err); 
    }
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
/*
exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingrediente.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, ingrediente) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingrediente);
  });
};
*/

exports.update = function (req, res) {
  var reqField = req.body.field;
  var reqValue = req.body.value;
  var ref = req.body.ref;

  Ingrediente
    .findById(req.params.id)
    .exec(function (err, ingrediente) {
      if (err) {
        return handleError(res, err);
      }
      if(reqField = 'alergenos') {

      }

    });
};

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