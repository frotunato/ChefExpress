angular.module('chefExpressApp.recetas', ['ngRoute', 'angularUtils.directives.dirPagination', 'chefExpressApp.ingredientes'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/recetas/:recetaId', {
        controller: 'recetaMainCtrl',
        templateUrl: 'app/recetas/receta'
      });
  });