angular.module('chefExpressApp', ['ngRoute', 'chefExpressApp.ingredientes', 'btford.socket-io', 'ui.bootstrap'])

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


