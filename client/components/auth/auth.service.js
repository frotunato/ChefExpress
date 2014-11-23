angular.module('chefExpressApp')
  
  .factory('UserAuth', function () {
    var auth = {
      isLogged: false
    };
    return auth;
  })

  .factory('Auth', function ($location, $rootScope, $http, $q, $window, UserAuth) {
    return {
      login: function (credenciales, callback) {
        return $http.post('/login', {
          usuario: credenciales.usuario, 
          password: credenciales.password
        })
        .success(function (data, status, headers, config) {
          $window.sessionStorage.token = data.token;
          UserAuth.isLogged = true;
          console.log('[AUTH.SERVICE]:', $window.sessionStorage.token);
        })
        .error(function (data, status, headers, config) {
          console.log(response, 'error auth.service');
        });
      }
    };
  });