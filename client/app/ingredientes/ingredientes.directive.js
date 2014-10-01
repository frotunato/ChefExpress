angular.module('chefExpressApp.ingredientes')
	
	.directive('focus', function () {
		return {
			restrict: 'A',
			replace: 'false',
				link: function (scope, elem, attr) {
					elem[0].focus();
			}
		}
	})