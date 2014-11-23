var secret = require('./secret.json').secret;
var jwt = require('jsonwebtoken');

module.exports = function () {
  var middleware = function (req, res, next) {
    jwt.verify(req.headers.authorization, secret, function (err, decoded) {
      if (err) {
        res.status(401).json({msg: 'token expired'});
      } else {
        next();
      }
    });
  };
  return middleware;
};