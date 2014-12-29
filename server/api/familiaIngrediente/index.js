var express = require('express');
var controller = require('./familiaIngrediente.controller');
var protect = require('../../auth/auth.service.js');

var router = express.Router();

//router.get('', protect(), controller.index);
//router.get('/:id', controller.show);
//router.post('', protect(), controller.create);
//router.put('/:id', controller.update);
router.patch('', protect(), controller.partialUpdate);
router.delete('', protect(), controller.destroy);
router.post('/:ids', controller.test);
router.get('', controller.test);
module.exports = router;