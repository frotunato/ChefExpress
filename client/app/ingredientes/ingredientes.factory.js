angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http, $q, $window) {
		return {
			apiUrl: '/api/ingredientes',
			getIngredientesPagina: function (config) {
				console.time('yoyo');
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
			removeIngredientes: function (config) {
				console.log(config);
				return $http.delete(this.apiUrl + '/', {
					data: {
						_ids: config
					},
					headers: {'Content-Type': 'application/json'}
				});
			}
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