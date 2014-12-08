var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = require('./secret.json').secret;
var tokenExpiration = require('../config/config').token.expirationInMinutes;

exports.login = function (req, res) {
  console.log(req.body);
  var r1 = 'admin';
  var r2 = 'admin';
  var usuario = req.body.usuario;
  var contraseña = req.body.password;
  
  if (r1 === usuario && r2 === contraseña) {
    var token = jwt.sign({usuario: usuario}, secret, {expiresInMinutes: tokenExpiration});
    res.json({token: token});
    console.log(token, 'yay');
  } else {
    res.status(401).json({error: 'invalid'});
  }

};

exports.test = function (req, res) {
  res.json({msg: 'authed'});
};