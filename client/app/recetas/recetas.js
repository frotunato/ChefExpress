angular.module('chefExpressApp.recetas', ['ngRoute', 'chefExpressApp.ingredientes', 'angularUtils.directives.dirPagination'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/recetas/:recetaId', {
        controller: 'recetaMainCtrl',
        templateUrl: 'app/recetas/receta'
      });
  });