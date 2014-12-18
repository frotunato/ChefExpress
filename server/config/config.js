var env = process.env.NODE_ENV = 'development';
var fs = require('fs');
var path = require('path');
var key = fs.readFileSync('cert/key.pem');
var cert = fs.readFileSync('cert/cert.pem');

var config = {
	ip: process.env.IP,
	root: path.normalize(__dirname + '/../..'),
  port: 4000,
  db: 'mongodb://localhost:27017/ChefExpress',
  host: 'localhost',
  token: {
    expirationInMinutes: 10,
    refresh: true,
    refreshThresholdInMs: 5000 * 60 
  },
  httpsOptions: {
    key: key,
    cert: cert
  }
};

module.exports = config;