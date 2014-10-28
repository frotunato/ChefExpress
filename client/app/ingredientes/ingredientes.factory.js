angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http, $q) {
		return {
			apiUrl: '/api/ingredientes',
			getIngredientes: function () {
				var a = Date.now();
				var deferred = $q.defer();
				$http.get(this.apiUrl).success(function (data, status) {
					deferred.resolve(data);
					var b = Date.now();
					console.log(b-a);
				});
				return deferred.promise;
			},
			getIngredientesPagina: function (config) {
				var a = Date.now();
				var deferred = $q.defer();						
				$http.get(this.apiUrl + '/', { params: {
						page: config.page,
						max: config.max,
						sort: config.sort,
						filter: config.filter
				}, cache: true
			}).success(function (data) {
					var b = Date.now();
					deferred.resolve(data);
					console.log(b-a);
				});
				return deferred.promise;
			},
			getIngrediente: function (id) {
				var deferred = $q.defer();
				$http.get(this.apiUrl +  '/' + id).success(function (data, status) {
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
			},
		
		};
	})

	.factory('alergenosIngredienteAPI', function ($http, $q) {
		return {
			apiUrl: '/api/alergenosIngrediente',
			getAlergenos: function () {
				var deferred = $q.defer();
				$http.get(this.apiUrl, {cache: true}).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			addAlergeno: function (alergeno) {
				var deferred = $q.defer();
				$http.post(this.apiUrl, alergeno).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		};
	})

	.factory('familiasIngredienteAPI', function ($http, $q) {
		return {
			apiUrl: '/api/familiasIngrediente',
			getFamilias: function () {
				var deferred = $q.defer();
				$http.get(this.apiUrl, {cache: true}).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			},
			addFamilia: function (familia) {
				var deferred = $q.defer();
				$http.post(this.apiUrl, familia).success(function (data, status) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		};
	});
