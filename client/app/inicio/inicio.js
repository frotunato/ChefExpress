angular.module('chefExpressApp.inicio', ['ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/ingredientes', {
        templateUrl: 'app/ingredientes/ingredientes',
        controller: 'ingredientesMainCtrl'
      })

      .when('/recetas', {
        templateUrl: 'app/recetas/recetas',
        controller: 'recetasMainCtrl'
      });
    
  });