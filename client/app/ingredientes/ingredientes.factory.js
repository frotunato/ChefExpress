angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http, $q) {
		return {
			apiUrl: '/api/ingredientes',
			getIngredientes: function () {
				var deferred = $q.defer();
				$http.get(this.apiUrl).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			getIngredientesPagina: function (pagina, cantidad, campo, orden) {
				var deferred = $q.defer();						
				$http.get(this.apiUrl + '/' + pagina + '/' + cantidad + '/' + campo + '/' + orden).success(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			getIngrediente: function (id) {
				var deferred = $q.defer();
				$http.get(this.apiUrl + id).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			updateIngrediente: function (id, data) {
				var deferred = $q.defer();
				$http.put(this.apiUrl + '/' + id, data).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			addIngrediente: function (data) {
					var deferred = $q.defer();
					$http.post(this.apiUrl, data).success(function (data, status) {
						deferred.resolve(data);
				});
				return deferred.promise;	
			}
		}
	})

/*
	.factory('ingredientesAPI', function ($resource) {
		return $resource('/api/ingredientes');
	});
*/