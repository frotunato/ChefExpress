angular.module('chefExpressApp.ingredientes')

	.factory('ingredientesAPI', function ($http, $q) {
		return {
			apiUrl: '/api/ingredientes',
			getIngredientes: function () {
				var deferred = $q.defer();
				$http.get(this.apiUrl).success(function (data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		}
	});