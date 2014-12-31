angular.module('chefExpressApp', ['ngRoute', 'ngResource', 'chieffancypants.loadingBar', 'chefExpressApp.inicio', 'chefExpressApp.login'])
  .config(function ($routeProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {
    //$locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('TokenInterceptor');
    cfpLoadingBarProvider.includeSpinner = false;

    $routeProvider
   	  
      .when('/login', {
        templateUrl: 'app/login/login',
        controller: 'loginCtrl',
        protect: false
      })

      .when('/inicio', {
        templateUrl: 'app/inicio/inicio',
        controller: 'inicioMainCtrl',
        protect: true
      })

     	.otherwise({
     		redirectTo: '/inicio'
     	});

  })
  
  .controller('navbarAppCtrl', function ($scope, $rootScope, UserAuth) {
    $scope.isLogged = false;
    $scope.$watch(function () {
      return UserAuth.isLogged;
    }, function () {
      $scope.isLogged = UserAuth.isLogged;
    });

  })

  .controller('viewCtrl', function ($scope, $rootScope) {
    $scope.isLoading = false;

    $rootScope.$on('cfpLoadingBar:started', function () {
      $scope.isLoading = true;
    });
    
    $rootScope.$on('cfpLoadingBar:completed', function () {
      $scope.isLoading = false;
    });
  
  })

  .factory('TokenInterceptor', function ($q, $window, $location, UserAuth) {
    return {
      request: function (config) {
        config.headers.authorization = $window.sessionStorage.token || {};
        return config;
      },

      requestError: function (rejection) {
        return $q.reject(rejection);
      },
      
      response: function (response) {
        if (response !== null && $window.sessionStorage.token && response.headers('authorization')) {
          console.groupCollapsed('%cAPP.TOKEN_INTERCEPTOR -> TOKEN REFRESHED', 'background: #222; color: #bada55;');
          console.log('%cOLD TOKEN -> %c' + $window.sessionStorage.token, 'font-weight: bold', '');
          console.log('%cNEW TOKEN -> %c' + response.headers('authorization'), 'font-weight: bold', '');
          console.groupEnd('APP.TOKEN_INTERCEPTOR -> TOKEN REFRESHED');
          $window.sessionStorage.token = response.headers('authorization');
        }
        return response || $q.when(response);
      },

      responseError: function (rejection) {
        if (rejection !== null && rejection.status === 401 && $window.sessionStorage.token !== undefined) {
          UserAuth.isLogged = false;
          delete $window.sessionStorage.token;
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
  })

  .run(function ($rootScope, $location, $window, $routeParams, UserAuth) {
    if (UserAuth.isLogged === false) {
      $location.path('/login');
    }

    $rootScope.$on('$routeChangeStart', function (event, nextRoute, prevRoute) {
      console.groupCollapsed('%cAPP.RUN -> ROUTE CHANGE START', 'background: #222; color: #bada55;');
      console.log('%cTOKEN -> %c' + $window.sessionStorage.token, 'font-weight: bold', '');
      console.log('%cLOGGIN STATUS -> %c' + UserAuth.isLogged, 'font-weight: bold', UserAuth.isLogged ? 'color: green;' : 'color: red;');
      console.groupEnd('APP.RUN -> ROUTE CHANGE START');
      if (nextRoute.protect && UserAuth.isLogged === false && !$window.sessionStorage.token) {
        $location.path('login');
        console.error('Route protected, user not logged in');
      } else if (!nextRoute.protect && UserAuth.isLogged) {
        $location.path('inicio');
      }
    });
  });