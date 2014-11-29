angular.module('chefExpressApp.recetas', ['ngRoute', 'chefExpressApp.ingredientes', 'angularUtils.directives.dirPagination'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/recetas/:recetaId', {
        controller: 'recetaMainCtrl',
        templateUrl: 'app/recetas/receta',
        protect: true,
        resolve: {
          initialData: function (recetasAPI, $route, $q) {
            return recetasAPI.getReceta($route.current.params.recetaId).then(function (response) {
              return response.data;
            });
          }
        }
      });
  });