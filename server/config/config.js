var env = process.env.NODE_ENV = 'development';
var path = require('path');
var config = {
	ip: process.env.IP,
	root: path.normalize(__dirname + '/../..'),
  port: 4000,
  db: 'mongodb://localhost:27017/ChefExpress',
  host: 'localhost',
  token: {
    expirationInMinutes: 2,
    refresh: true,
    refreshThresholdInMs: 1000 * 60 
  }
};

module.exports = config;