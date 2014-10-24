var _ = require('lodash');
var Receta = require('./receta.model');

// Get list of Recetas
exports.index = function(req, res) {
  var sorting = {};
  var filtering = {};
  sorting = JSON.parse(req.query.sort);  
  filtering = JSON.parse(req.query.filter);
  console.log(JSON.stringify(filtering));
  
  if(filtering.nombre) {
    filtering.nombre = new RegExp(filtering.nombre, "i");
  }
  
  Receta
    .find(filtering)
    .limit(req.query.max)
    .skip(req.query.max * req.query.page)
    .sort(sorting)
    .exec(function (err, recetas) {
      if(err) { return handleError(res, err); }
      //console.log(recetas.length);
      Receta.count(filtering ,function (err, c) {
        return res.status(200).json({data: recetas, total: c});        
      });
    });
};

function checkIfExist (data, key, value, callback) {
  console.log(typeof data, typeof key, typeof value);
  var res = null;
  var index = null;
  if(data.length === 0) {
    res = false;
  } else {
    for (var i = data.length - 1; i >= 0; i--) {
      if(data[i][key] == value) {
        res = true;
        index = i;
        break; 
      } else {
        res = false;
      }
    }
  }
  callback(res, index);
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
    //console.log(JSON.stringify(req.params));
    if(err) { return handleError(res, err); }
    return res.status(201).json();
  });
};

exports.update = function (req, res) {
  var reqField = req.body.field;
  var reqValue = req.body.value;
  var ref = req.body.ref;
  console.log(reqField, reqValue, ref);

  Receta
  .findById(req.params.id)
  //.populate('ingredientes.ingrediente')
  .exec(function (err, receta) {
    var resData = {};
    //console.log(receta.ingredientes.id(ref));
    if (reqField === 'ingredientes' || reqField ==='cantidad') {        
      var ingrediente = receta.ingredientes.id(ref);          
      if(ingrediente !== null && reqField === 'ingredientes' && reqValue === 'remove') {
        //delete an object from the object array
        resData = ingrediente.remove();
        //console.log(JSON.stringify(ingrediente));
      } else if (reqField === 'ingredientes' && reqValue === 'add') {
        //push an object to the object array
        var nuevoIngrediente = receta.ingredientes.addToSet({ingrediente: ref})[0];
        resData = nuevoIngrediente._id;
        //console.log('pushed', JSON.stringify(nuevoIngrediente));
      } else if (reqField === 'cantidad') {
        ingrediente.cantidad = reqValue;
        //modifies an object property of the object array
        //receta.ingredientes[index].cantidad = reqValue;
      }
    
    } else {
      //console.log(JSON.stringify(receta));
      receta[reqField] = reqValue;
    }
    
    receta.save(function (err) {
      return res.status(200).json(resData);
    });
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