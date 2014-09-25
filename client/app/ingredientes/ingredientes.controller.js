angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ingredientesAPI) {
		$scope.ingredientes = ingredientesAPI.getIngredientes();
	});