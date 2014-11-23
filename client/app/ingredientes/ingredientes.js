angular.module('chefExpressApp.ingredientes', ['ngRoute', 'chefExpressApp.inicio','angularUtils.directives.dirPagination', 'ui.bootstrap'])
	
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ingredientes/configuracion', {
        templateUrl: 'app/ingredientes/configuracionIngredientes'
      });
  });