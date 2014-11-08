angular.module('chefExpressApp.recetas')

  .factory('recetasAPI', function ($http, $q) {
    return {
      apiUrl: '/api/recetas',
      getRecetas: function (config) {
        //var a = Date.now();
        var deferred = $q.defer();
        $http.get(this.apiUrl + '/', { params: {
          page: config.page,
          max: config.max,
          sort: config.sort,
          filter: config.filter
        }, cache: true
      }).success(function (data, status) {
          deferred.resolve(data);
          //var b = Date.now();
          //console.log('[FACTORIA] Datos de la tabla de recetas obtenidos del servidor en', b-a, 'ms');
        //console.log(JSON.stringify(data))
        });
        return deferred.promise;
      },
      getReceta: function (id) {
        var deferred = $q.defer();
        $http.get(this.apiUrl + '/' + id, {cache: true}).success(function (data, status) {
          deferred.resolve(data);
        });
        return deferred.promise;
      },
      addReceta: function (data) {
        var deferred = $q.defer();
        $http.post(this.apiUrl, data).success(function (data, status) {
          deferred.resolve(data);
        });
        return deferred.promise;  
      },
      updateReceta: function (id, data) {
        var deferred = $q.defer();
        $http.put(this.apiUrl + '/' + id, data).success(function (data, status) {
          console.log('[FACTORIA] Código de updateReceta', status, 'Datos', data);
          deferred.resolve({data: data, code: status});
        });
        return deferred.promise;
      },
      removeReceta: function (id) {
        var deferred = $q.defer();
        $http.delete(this.apiUrl + '/' + id).success(function (data, status) {
          deferred.resolve(data);
        });
        return deferred.promise;
      }
    };
  });