angular.module('chefExpressApp.login');
  /*
  .factory('ServicioAutentificacion', function () {
    var auth = {
      estaLogeado: false
    };
    return auth;
  })

  .factory('ServicioUsuario', function ($http) {
    return {
      apiUrl: '/login',
      logIn: function (usuario, contraseña) {
        return $http.post(apiUrl, {usuario: usuario, contraseña: contraseña});
      }
    };
  })
  
  .factory('TokenInterceptor', function ($q, $window, $location, ServicioAutentificacion) {
    return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = $window.sessionStorage.token;
        }
        return config;
      },

      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      
      response: function (response) {
        if (response !== null && response.status === 200 && $window.sessionStorage.token && !ServicioAutentificacion.estaLogeado) {
          ServicioAutentificacion.estaLogeado = true;
        }
        return response || $q.when(response);
      },

      responseError: function (rejection) {
        if (rejection !== null && rejection.status === 401 && ($window.sessionStorage.token || ServicioAutentificacion.estaLogeado)) {
          delete $window.sessionStorage.token;
          ServicioAutentificacion.estaLogeado = false;
          console.log('teeeemmp');
          $location.path('/admin/login');
        }
      }
    };
  });
  */