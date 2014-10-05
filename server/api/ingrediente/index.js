'use strict';

var express = require('express');
var controller = require('./ingrediente.controller');

var router = express.Router();

router.get('', controller.index);
router.get('/search/:nombre', controller.showFiltered);
router.get('/:params', controller.pagination);
router.get('/:id', controller.show);
router.post('', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;