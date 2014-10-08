angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.ingredientes', 'chefExpressApp.inicio'])

.config(function ($routeProvider) {
 $routeProvider
 	
 	
  .when('/', {
    templateUrl: 'app/inicio/inicio',
    controller: 'inicioMainCtrl'
  })

 	.otherwise({
 		redirectTo: '/'
 	});

});