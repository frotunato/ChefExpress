var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config.js');
var app = express();
var server = require('http').createServer(app);
//var socketio = require('socket.io')(server);

require('./config/express')(app);
require('./routes')(app);
require('./config/db')(config);

server.listen(config.port, config.ip, function () {
	console.log('Express server running at port %d in %s mode', config.port, process.env.NODE_ENV);
});

exports = module.exports = app;