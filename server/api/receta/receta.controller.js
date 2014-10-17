var _ = require('lodash');
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
      Receta.count(filtering ,function (err, c) {
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

function checkIfExist (data, key, value, callback) {
  var res = null;
  if(data.length === 0) {
    res = false;
  } else {
    for (var i = data.length - 1; i >= 0; i--) {
      if( data[i][key] === value ) {
        res = true;
        break; 
      } else {
        res = false;
      }
    }
  }
  callback(res);
}

exports.show = function (req, res) {
  Receta
    .findById(req.params.id)
    .populate('ingredientes.ingrediente')
    .exec(function (err, recetas) {
      if (err) {
        return handleError(res, err);
      }
      if (!recetas) {
        return res.send(404);
      }
      //console.log(JSON.stringify(recetas));
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



/*
exports.update = function (req, res) {
  var action = {};
  console.log(JSON.stringify(req.body));
  action = {$set: req.body};
  console.log('action', JSON.stringify(action));
  if(req.body._id) { delete req.body._id; }
  if(req.body.ingredientes) { action = { $addToSet: {ingredientes: req.body.ingredientes}}; }
  Receta.findByIdAndUpdate(req.params.id, action,
  function (err, receta) {
    if(err) { return handleError(res, err); }
    console.log(JSON.stringify(receta.ingredientes));
    return res.status(200).json(receta);
  });
};
*/
/*
exports.update = function (req, res) {
  var action = {};
  action = {$set: req.body};
  if(req.body._id) { delete req.body._id; }
  if(req.body.ingredientes) { action = { $addToSet: {ingredientes: req.body.ingredientes}}; }
  Receta.findByIdAndUpdate(req.params.id, action, {safe: true, upsert: true},
  function (err, receta) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(receta);
  });
};
*/
/*
exports.update = function (req, res) {
  var query = {};

  action = {$set: req.body};
  if(req.body.ingredientes.ingrediente) {
    console.log(JSON.stringify(req.body), 'a');
    action = {};
    //action = {$push: {ingredientes: {ingrediente: req.body.ingredientes.ingrediente}}};
  } if(req.body.ingredientes.cantidad) {
    console.log('cantidad', JSON.stringify(req.body));
    action = {};
  }
  Receta
    .findByIdAndUpdate(req.params.id, action)
    .exec(function (err, receta) {
      console.log(JSON.stringify(receta));
      return res.status(200).json(receta);
    });
};
*/

exports.update = function (req, res) {
  console.log(JSON.stringify(req.body));
  var field = req.body.field;
  var fieldName = Object.keys(field)[0];
  Receta
  .findById(req.params.id)
  .exec(function (err, receta) {
    if(req.body.ingrediente) {
      for (var i = receta.ingredientes.length - 1; i >= 0; i--) {
        if(receta.ingredientes[i].ingrediente == req.body.ingrediente) {
          receta.ingredientes[i][fieldName] = field[fieldName];
          break;
        }
      }  
    } else {
    receta[fieldName] = field[fieldName];
    }
    
    receta.save(function (err) {
      return res.status(200).json(receta);
    });
  });
};

/*
exports.update = function(req, res) {
  console.log(JSON.stringify(req.body));
  if(req.body._id) { delete req.body._id; }
    Receta.findById(req.params.id, function (err, recetas) {
    if (err) { return handleError(res, err); }
    if(!recetas) { return res.send(404); }
    var updated = _.merge(recetas, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(recetas);
    });
  });
};
*/
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