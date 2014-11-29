angular.module('chefExpressApp', ['ngRoute', 'ngAnimate', 'chieffancypants.loadingBar', 'chefExpressApp.inicio', 'chefExpressApp.login'])
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
        protect: true,
        resolve: {
          navbar: function (Navbar) {
            Navbar.area = 'Inicio';
            console.log('[APP.CTRL] navbar', Navbar);
            return;
          }
        }
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
        //$window.sessionStorage.token = 'amai';
        console.log('[TOKEN INTERCEPTOR]', 'request');
        config.headers.authorization = $window.sessionStorage.token || {};
        return config;
      },

      requestError: function (rejection) {
        console.log('[TOKEN INTERCEPTOR]', 'requestError');
        return $q.reject(rejection);
      },
      
      response: function (response) {
        console.log('[TOKEN INTERCEPTOR]', 'response');
        //if (response !== null && response.status === 200 && $window.sessionStorage.token) {
        //}
        return response || $q.when(response);
      },

      responseError: function (rejection) {
        if (rejection !== null && rejection.status === 401 && $window.sessionStorage.token !== undefined) {
          console.log('[TOKEN INTERCEPTOR]', 'responseError');
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
      console.log('[APP.RUN ROUTE CHANGE START]', 'token', $window.sessionStorage.token);
      console.log('[APP.RUN ROUTE CHANGE START]', 'next route', nextRoute.templateUrl);
      console.log('[APP.RUN ROUTE CHANGE START]', 'user logged', UserAuth.isLogged);
      if (nextRoute.protect && UserAuth.isLogged === false && $window.sessionStorage.token === undefined) {
        $location.path('/login');
        console.log('route protected, user not logged in');
      }
    });
  });