var express = require('express');
var controller = require('./familia.controller');
var protect = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/', protect(), controller.index);
router.get('/:id', protect(), controller.show);
router.post('', protect(), controller.create);
router.put('/:id', protect(), controller.replace);
router.patch('/', controller.updateCollection);
router.patch('/:id', protect(), controller.update);
router.delete('', protect(), controller.destroyCollection);
router.delete('/:id', protect(), controller.destroy);
module.exports = router;