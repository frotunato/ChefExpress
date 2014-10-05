angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.ingredientes'])

.config(function ($routeProvider) {
 $routeProvider
 	
 	.when('/ingredientes', {
 		templateUrl: 'app/ingredientes/ingredientes',
 		controller: 'ingredientesMainCtrl'
 	})
 	
 	.otherwise({
 		redirectTo: '/'
 	})

});


