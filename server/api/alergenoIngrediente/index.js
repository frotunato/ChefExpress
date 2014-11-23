var express = require('express');
var protect = require('../../auth/auth.service.js');
var controller = require('./alergenoIngrediente.controller');

var router = express.Router();

router.get('', protect(), controller.index);
//router.get('/:id', controller.show);
router.post('', protect(), controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;