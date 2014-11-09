angular.module('chefExpressApp.recetas')

  .factory('recetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/recetas',
      getRecetas: function (config) {
        return $http.get(this.apiUrl + '/', { params: {
          page: config.page,
          max: config.max,
          sort: config.sort,
          filter: config.filter
        }, cache: false });
        //return deferred.promise;
      },
      getReceta: function (id) {
        return $http.get(this.apiUrl + '/' + id, {cache: false});
      },
      addReceta: function (data) {
        return $http.post(this.apiUrl, data);
      },
      updateReceta: function (id, data) {
        return $http.put(this.apiUrl + '/' + id, data);
      },
      removeReceta: function (id) {
        return $http.delete(this.apiUrl + '/' + id);
      }
    };
  })

  .factory('familiasRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/familiasReceta',
      getFamilias: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addFamilia: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('categoriasRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/categoriasReceta',
      getCategorias: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addCategoria: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('tiposRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/tiposReceta',
      getTipos: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addTipo: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('ambitosRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/ambitosReceta',
      getAmbitos: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addAmbito: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('medidasPreventivasRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/medidasPreventivasReceta',
      getMedidasPreventivas: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addMedidasPreventiva: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('peligrosIngredientesRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/peligrosIngredientesReceta',
      getPeligrosIngredientes: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addPeligrosIngrediente: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('peligrosDesarrolloRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/peligrosDesarrolloReceta',
      getPeligrosDesarrollo: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addPeligroDesarrollo: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .factory('procedenciasRecetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/procedenciasReceta',
      getProcedencias: function () {
        return $http.get(this.apiUrl, {cache: true});
      },
      addProcedencia: function (familia) {
        return $http.post(this.apiUrl, familia);
      }
    };
  })

  .service('propCompartidasReceta', function () {
    var prop = {};
    return {
      getPropCompartidas: function () {
        return prop;
      },
      setPropCompartidas: function (data) {
        prop = data;
      }
    };
  });