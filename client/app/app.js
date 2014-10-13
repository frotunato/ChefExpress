angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.ingredientes', 'chefExpressApp.inicio', 'chefExpressApp.recetas'])

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