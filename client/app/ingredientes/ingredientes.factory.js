angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http, $q, $window) {
		return {
			apiUrl: '/api/ingredientes',
			getPage: function (config) {
				console.time('yoyo');
				return $http.get(this.apiUrl + '/', { params: {
					page: config.page,
					max: config.max,
					sort: config.sort,
					filter: config.filter
					}, cache: false
				});
			},
			get: function (id) {
				return $http.get(this.apiUrl +  '/' + id);
			},
			update: function (id, data) {
				return $http.put(this.apiUrl + '/' + id, data);
			},
			create: function (data) {
				return $http.post(this.apiUrl, data);
			},
			remove: function (config) {
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
			partialUpdate: function (familia) {
				console.log('going to patch', familia);
				return $http.patch(this.apiUrl, familia);
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