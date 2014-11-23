angular.module('chefExpressApp.inicio', ['chefExpressApp.ingredientes', 'chefExpressApp.recetas', 'ngRoute'])

  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/ingredientes', {
        templateUrl: 'app/ingredientes/ingredientes',
        controller: 'ingredientesMainCtrl',
        protect: true,
        resolve: {
          initialData: function (ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI,intoleranciasIngredienteAPI, $q) {
            var promises = {};
            
            promises.ingredientes = ingredientesAPI.getIngredientesPagina({
              page: 0, 
              max: 25, 
              sort: {nombre: 'asc'},
              filter: {}
            }).then(function (response) {
              return {data: response.data.ingredientes, total: response.data.total};
            });

            promises.alergenos = alergenosIngredienteAPI.getAlergenos().then(function (response) {
              return response.data;                
            });
            
            promises.intolerancias = intoleranciasIngredienteAPI.getIntolerancias().then(function (response) {
              return response.data;
            });

            promises.familias = familiasIngredienteAPI.getFamilias().then(function (response) {
              return response.data;
            });
            
            return $q.all(promises);
          }    
        }
      })

      .when('/recetas', {
        templateUrl: 'app/recetas/recetas',
        controller: 'recetasMainCtrl',
        protect: true,
        resolve: {
          initialData: function (recetasAPI, familiasRecetasAPI, tiposRecetasAPI, ambitosRecetasAPI, categoriasRecetasAPI, medidasPreventivasRecetasAPI, peligrosIngredientesRecetasAPI, peligrosDesarrolloRecetasAPI, procedenciasRecetasAPI, $q) {
            var promises = {};

            promises.recetas = recetasAPI.getRecetas({
              page: 0,
              max: 25,
              sort: {nombre: 'asc'},
              filter: {}
            }).then(function (response) {
              return {data: response.data.recetas, total: response.data.total};
            });
          
            promises.familias = familiasRecetasAPI.getFamilias().then(function (response) {
              return response.data;
            });

            promises.ambitos = ambitosRecetasAPI.getAmbitos().then(function (response) {
              return response.data;
            });

            promises.procedencias = procedenciasRecetasAPI.getProcedencias().then(function (response) {
              return response.data;
            });

            promises.tipos = tiposRecetasAPI.getTipos().then(function (response) {
              return response.data;
            });
            
            promises.categorias = categoriasRecetasAPI.getCategorias().then(function (response) {
              return response.data;
            });

            /*
            promises.peligrosIngredientes = peligrosIngredientesRecetasAPI.getPeligrosIngredientes().then(function (response) {
              return response.data;
            });

            promises.peligrosDesarrollo = peligrosDesarrolloRecetasAPI.getPeligrosDesarrollo().then(function (response) {
              return response.data;
            });

            promises.medidasPreventivas = medidasPreventivasRecetasAPI.getMedidasPreventivas().then(function (response) {
              return response.data;
            });
            */
            return $q.all(promises);
          }
 
        }
      });
    
  }); 