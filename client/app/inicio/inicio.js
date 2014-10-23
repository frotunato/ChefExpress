angular.module('chefExpressApp.inicio', ['chefExpressApp.ingredientes', 'chefExpressApp.recetas', 'ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/ingredientes', {
        templateUrl: 'app/ingredientes/ingredientes',
        controller: 'ingredientesMainCtrl',
        resolve: {
          initialIngredientesData: function (ingredientesAPI, $q) {
            var deferred = $q.defer();
            var res = {};
            console.log('Llamada desde config ' + Date.now());
            ingredientesAPI.
              getIngredientesPagina({
                page: 0, 
                max: 20, 
                sort: {nombre: 'asc'},
                filter: {}
              }).then(function (result) {
                console.log({ingredientes: result.data, total: result.total});
                res =  {ingredientes: result.data, total: result.total};
                deferred.resolve(res);
              });
            return deferred.promise;
          }}
      })

      .when('/recetas', {
        templateUrl: 'app/recetas/recetas',
        controller: 'recetasMainCtrl',
        resolve: {
          initialRecetasData: function (recetasAPI, $q) {
            var deferred = $q.defer();
            var res = {};
            recetasAPI.getRecetas({
              page: 0,
              max: 20,
              sort: {nombre: 'asc'},
              filter: {}
            }).then(function (result) {
              res = {recetas: result.data, total: result.total};
              deferred.resolve(res);
            });
            return deferred.promise;
          }
        }
      });
    
  }); 