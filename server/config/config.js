var env = process.env.NODE_ENV = 'development';
var path = require('path');
var config = {
	ip: process.env.IP,
	root: path.normalize(__dirname + '/../..'),
  port: 4000,
  db: 'mongodb://localhost:27017/ChefExpress',
  host: 'localhost'
};

module.exports = config;