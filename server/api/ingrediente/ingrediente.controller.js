//var _ = require('lodash');
var Ingrediente = require('./ingrediente.model');


exports.index = function(req, res) {
  var sorting = {};  
  var filtering = {};
  filtering = JSON.parse(req.query.filter);
  sorting = JSON.parse(req.query.sort);
  console.log(JSON.stringify(req.body));
  if(filtering.nombre) {
    filtering.nombre = new RegExp(filtering.nombre, "i");
  }
  
  Ingrediente
    .find(filtering)
    .lean()
    .skip(req.query.max * req.query.page)
    .limit(req.query.max)
    .sort(sorting)
    //.select('nombre _id proteinas carbohidratos grasas calorias')
    .populate('alergenos familia intolerancias')
    /*
    .populate([
      {path: 'familia', select: '-__v', model: 'FamiliaIngrediente'},
      {path: 'alergenos', select: '-__v', model: 'AlergenoIngrediente'},
      {path: 'intolerancias', select: '-__v', model: 'IntoleranciaIngrediente'}
    ])
    */
    .exec(function (err, ingredientes) {
      if(err) { return handleError(res, err); }
      Ingrediente.count(filtering, function (err, c) {
        return res.status(200).json({ingredientes: ingredientes, total: c});        
      });
    });
};

exports.show = function(req, res) {
  Ingrediente
    .findById(req.params.id)
    .lean()
    .populate('alergenos intolerancias')
    .select('-__v')
    .exec(function (err, ingrediente) {
      if(err) { return handleError(res, err); }
      if(!ingrediente) { return res.status(404); }
      //console.log('response');
      console.log(JSON.stringify(ingrediente));
      return res.status(200).json(ingrediente);   
    });   
};

exports.create = function(req, res) {
  console.log(JSON.stringify(req.body));
  Ingrediente.create(req.body, function(err, ingredientes) {
    //console.log(req.body);
    if(err) { 
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
exports.update = function (req, res) {
  if(req.body._id) { delete req.body._id; }
  Ingrediente.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, ingrediente) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(ingrediente);
  });
};
/*
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
      ingrediente.alergenos = req.body.alergenos;
      ingrediente.save(function () {
        return res.status(200).json();
      });
    });
};
*/
exports.destroy = function(req, res) {
  console.log(req.body, req.query, req.params);
  Ingrediente.remove({'_id': {$in: req.body._ids}}, function (err) {
    if (err) return handleError(err);
    return res.status(204).json({msg: 'deleted'});
  });
  /*
  Ingrediente.findById(req.params.id, function (err, ingredientes) {
    if(err) { return handleError(res, err); }
    if(!ingredientes) { return res.send(404); }
    Ingrediente.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204);
    });
  });
  */
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}