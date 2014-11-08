angular.module('chefExpressApp.recetas', ['ngRoute', 'chefExpressApp.ingredientes', 'angularUtils.directives.dirPagination'])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/recetas/:recetaId', {
        controller: 'recetaMainCtrl',
        templateUrl: 'app/recetas/receta',
        resolve: {
          initialRecetaData: function (recetasAPI, $route, $q) {
            var deferred = $q.defer();
            recetasAPI.getReceta($route.current.params.recetaId).then(function (data) {
              console.log(JSON.stringify(data));
              deferred.resolve({receta: data});
            });
            return deferred.promise;
          }
        }
      });
  });