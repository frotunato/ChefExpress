angular.module('chefExpressApp.ingredientes')

	.factory('Ingrediente', function ($resource) {
		return $resource(
			"/api/ingredientes/:id",
			{},
			{ 
				query: {method: 'GET', isArray: false},
			  update: {method: 'PATCH'}
			}
		);
	})

	.factory('FamiliaIngrediente', function ($resource) {
		return $resource(
			"/api/familias/?tipo=ingredientes&=",
			{},
			{
				update: {method: 'PATCH', isArray: true},
				save: {method: 'POST', isArray: true}
			}
		);
	})

	.factory("Alergeno", function ($resource) {
		return $resource(
			"/api/alergenos/",
			{},
			{
				update: {method: 'PATCH', isArray: true}
			}
		);
	})

	.factory("Intolerancia", function ($resource) {
		return $resource(
			"/api/intolerancias/",
			{},
			{
				update: {method: 'PATCH', isArray: true}
			}
		);
	});