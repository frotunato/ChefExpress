angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.ingredientes'])

.config(function ($routeProvider) {
 $routeProvider
 	
 	.when('/ingredientes', {
 		controller: 'ingredientesMainCtrl',
 		templateUrl: 'app/ingredientes/ingredientes'
 	})
 	
 	.otherwise({
 		redirectTo: '/'
 	})

});


