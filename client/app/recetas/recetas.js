angular.module('chefExpressApp.recetas', ['ngRoute', 'chefExpressApp.ingredientes', 'angularUtils.directives.dirPagination'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/recetas/:recetaId', {
        controller: 'recetaMainCtrl',
        templateUrl: 'app/recetas/receta',
        resolve: {
          initialData2: function (recetasAPI, $route, $q) {
            recetasAPI.getReceta($route.current.params.recetaId).then(function (response) {
              return response.data;
            });
          }
        }
      });
  });