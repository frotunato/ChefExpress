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
          },
          initialAlergenos: function (alergenosIngredienteAPI, $q) {
            var deferred = $q.defer();
            var res = {};
            alergenosIngredienteAPI.getAlergenos().then(
              function (data) {
                res = data;
                console.log('alergenos', JSON.stringify(res));
                deferred.resolve(res);
              },
              function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
          },
          initialFamilias: function (familiasIngredienteAPI, $q) {
            var deferred = $q.defer();
            var res = {};
            familiasIngredienteAPI.getFamilias().then(
              function (data) {
                res = data;
                console.log('alergenos', JSON.stringify(res));
                deferred.resolve(res);
              },
              function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
          }
        }
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