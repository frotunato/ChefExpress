angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.inicio', 'chefExpressApp.login'])
  .config(function ($routeProvider, $httpProvider, $locationProvider) {
    //$locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('TokenInterceptor');

    $routeProvider
   	  
      .when('/login', {
        templateUrl: 'app/login/login',
        controller: 'loginCtrl',
        protect: false
      })

      .when('/inicio', {
        templateUrl: 'app/inicio/inicio',
        controller: 'inicioMainCtrl',
        protect: true,
      });

     	//.otherwise({
     	//	redirectTo: '/'
     	//});

  })

  .factory('TokenInterceptor', function ($q, $window, $location) {
    return {
      request: function (config) {
        //$window.sessionStorage.token = 'amai';
        
        config.headers.authorization = $window.sessionStorage.token || {};
        return config;
      },

      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      
      response: function (response) {
        //if (response !== null && response.status === 200 && $window.sessionStorage.token) {
        //}
        return response || $q.when(response);
      },

      responseError: function (rejection) {
        if (rejection !== null && rejection.status === 401 && $window.sessionStorage.token) {
          delete $window.sessionStorage.token;
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  })

  .run(function ($rootScope, $location, $window, $routeParams, UserAuth) {
    if (!UserAuth.isLogged) {
      $location.path('/login');
    }

    $rootScope.$on('$routeChangeStart', function (event, nextRoute, prevRoute) {
      console.log('token', $window.sessionStorage.token);
      if (nextRoute.protect && !UserAuth.isLogged) {
        $location.path('/login');
        console.log('route protected, user not logged in');
      }
      console.log('routeChangeStart');
    });
  });