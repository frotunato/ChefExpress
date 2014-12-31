var _ = require('lodash');
var Model = require('./receta.model');

exports.index = function(req, res) {
  var sorting = {};
  var filtering = {};
  sorting = JSON.parse(req.query.sort);  
  filtering = JSON.parse(req.query.filter);
  console.log(JSON.stringify(filtering));
  
  if(filtering.nombre) {
    filtering.nombre = new RegExp(filtering.nombre, "i");
  }
  
  Model
    .find(filtering)
    .lean()
    .select('nombre familia categoria ambito procedencia tipo')
    .limit(req.query.max)
    .skip(req.query.max * req.query.page)
    .sort(sorting)
    .populate('familia categoria ambito tipo procedencia')
    .exec(function (err, docs) {
      if(err) { return handleError(res, err); }
      //console.log(recetas.length);
      Model.count(filtering ,function (err, c) {
        return res.status(200).json({recetas: docs, total: c});        
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
  Model
    .findById(req.params.id)
    .populate('ingredientes.ingrediente familia ambito tipo medidasPreventivas peligrosIngredientes peligrosDesarrollo procedencia')
    .lean()
    .exec(function (err, doc) {
      //population dentro de ingrediente
      var options = [{
        path: 'ingredientes.ingrediente.alergenos',
        model: 'alergeno'
      }, {
        path: 'ingredientes.ingrediente.intolerancias',
        model: 'intolerancia'
      }];

      if (err) {
        return handleError(res, err);
      }
      if (!doc) {
        return res.send(404);
      }
      //console.log(JSON.stringify(recetas));
      Model.populate(doc, options, function (err, doc) {
        console.log(JSON.stringify(doc.ingredientes));
        return res.status(201).json(doc);
      });
    });
};

exports.create = function(req, res) {
  Model.create(req.body, function (err, doc) {
    //console.log(JSON.stringify(req.body));
    if(err) { return handleError(res, err); }
    console.log(err);
    return res.status(201).end();
  });
};

exports.update = function (req, res) {
  var reqField = req.body.field;
  var reqValue = req.body.value;
  var ref = req.body.ref;
  console.log(reqField, reqValue, ref);

  Model
  .findById(req.params.id)
  .populate('ingredientes.ingrediente')
  //.lean()
  .exec(function (err, doc) {
    var resData = {};
    //console.log(receta.ingredientes.id(ref));
    if (reqField === 'ingredientes' || reqField ==='cantidad') {        
      var ingrediente = doc.ingredientes.id(ref);          
      if(ingrediente !== null && reqField === 'ingredientes' && reqValue === 'remove') {
        //delete an object from the object array
        resData = ingrediente.remove();
        //console.log(JSON.stringify(ingrediente));
      } else if (reqField === 'ingredientes' && reqValue === 'add') {
        //push an object to the object array
        var nuevoIngrediente = doc.ingredientes.addToSet({ingrediente: ref})[0];
        console.log(nuevoIngrediente._id);
        resData = nuevoIngrediente._id;
        //console.log('pushed', JSON.stringify(nuevoIngrediente));
      } else if (reqField === 'cantidad') {
        ingrediente.cantidad = reqValue;
        //modifies an object property of the object array
        //receta.ingredientes[index].cantidad = reqValue;
      }
    
    } else {
      //console.log(JSON.stringify(receta));
      doc[reqField] = reqValue;
    }
    
    doc.save(function (err) {
      return res.status(200).json(resData);
    });
  });
};

exports.destroy = function(req, res) {
  Model.findById(req.params.id, function (err, docs) {
    if(err) { return handleError(res, err); }
    if(!docs) { return res.send(404); }
    Model.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204);
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}