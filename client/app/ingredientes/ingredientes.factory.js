angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http) {
		return {
			apiUrl: '/api/ingredientes',
			getPage: function (config) {
				return $http.get(this.apiUrl + '/' + config.page + '/' + config.max, { params: {
					sort: config.sort,
					filter: config.filter
					}, cache: false
				});
			},
			get: function (id) {
				return $http.get(this.apiUrl +  '/' + id);
			},
			replace: function (id, data) {
				return $http.put(this.apiUrl + '/' + id, data);
			},
			update: function (data) {
				return $http.patch(this.apiUrl, data);
			},
			create: function (data) {
				return $http.post(this.apiUrl, data);
			},
			remove: function (config) {
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
			getAll: function () {
				return	$http.get(this.apiUrl);
			},
			create: function (alergeno) {
				return $http.post(this.apiUrl, alergeno);
			},
			partialUpdate: function (alergeno) {
				return $http.patch(this.apiUrl, alergeno);
			},
			remove: function (config) {
				return $http.delete(this.apiUrl + '/', {
					data: {
						_ids: config
					},
					headers: {'Content-Type': 'application/json'}
				});
			}
		};
	})

	.factory('familiasIngredienteAPI', function ($http) {
		return {
			apiUrl: '/api/familiasIngrediente',
			getAll: function () {
				return $http.get(this.apiUrl);
			},
			create: function (familia) {
				console.log('familia response', familia);
				return $http.post(this.apiUrl, familia);
			},
			replace: function (familia) {
				console.log('going to patch', familia);
				return $http.patch(this.apiUrl, familia);
			},
			remove: function (familia) {
				return $http.delete(this.apiUrl + '/', {
					data: familia,
					headers: {'Content-Type': 'application/json'}
				});
			}
		};
	})

	.factory('intoleranciasIngredienteAPI', function ($http) {
		return {
			apiUrl: '/api/familiasIngrediente',
			getAll: function () {
				return $http.get(this.apiUrl);
			},
			create: function (intolerancia) {
				return $http.post(this.apiUrl, intolerancia);
			},
			partialUpdate: function (intolerancia) {
				return $http.patch(this.apiUrl, intolerancia);
			},
			remove: function (config) {
				return $http.delete(this.apiUrl + '/', {
					data: {
						_ids: config
					},
					headers: {'Content-Type': 'application/json'}
				});			
			}
		};
	});