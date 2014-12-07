angular.module('chefExpressApp.ingredientes', ['ngRoute', 'chefExpressApp.inicio','angularUtils.directives.dirPagination', 'mgcrea.ngStrap'])
	
  .config(function ($routeProvider) {
    $routeProvider
      .when('/ingredientes/configuracion', {
        templateUrl: 'app/ingredientes/configuracionIngredientes'
      });
  });