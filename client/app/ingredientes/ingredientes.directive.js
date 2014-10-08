angular.module('chefExpressApp.ingredientes')
	
	.directive('focus', function () {
		return {
			restrict: 'A',
			scope: '@',
			link: function (scope, elem, attr) {
				elem[0].focus();
			}
		};
	});