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
				return $http.get(this.apiUrl + '/', { params: {
					page: config.page,
					max: config.max,
					sort: config.sort,
					filter: config.filter
					}, cache: false
				});
			},
			getIngrediente: function (id) {
				return $http.get(this.apiUrl +  '/' + id);
			},
			updateIngrediente: function (id, data) {
				return $http.put(this.apiUrl + '/' + id, data);
			},
			addIngrediente: function (data) {
				return $http.post(this.apiUrl, data);
			},
		
		};
	})

	.factory('alergenosIngredienteAPI', function ($http) {
		return {
			apiUrl: '/api/alergenosIngrediente',
			getAlergenos: function () {
				return	$http.get(this.apiUrl, {cache: true});
			},
			addAlergeno: function (alergeno) {
				return $http.post(this.apiUrl, alergeno);
			}
		};
	})

	.factory('familiasIngredienteAPI', function ($http) {
		return {
			apiUrl: '/api/familiasIngrediente',
			getFamilias: function () {
				return $http.get(this.apiUrl, {cache: true});
			},
			addFamilia: function (familia) {
				return $http.post(this.apiUrl, familia);
			}
		};
	})

	.factory('intoleranciasIngredienteAPI', function ($http) {
		return {
			apiUrl: '/api/intoleranciasIngrediente',
			getIntolerancias: function () {
				return $http.get(this.apiUrl, {cache: true});
			},
			addIntolerancia: function (intolerancia) {
				return $http.post(this.apiUrl, intolerancia);
			}
		};
	});