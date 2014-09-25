var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./config.js');

module.exports = function(app) {

  app.set('appPath', path.join(config.root, 'client'));
  app.set('view engine', 'jade');
  app.set('views', path.join(app.get('appPath'), '/app/'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(express.static(app.get('appPath')));
  app.use(morgan(':remote-addr :method :url'));
  app.use(errorHandler());
	
};



