angular.module('chefExpressApp.ingredientes')
	
	.directive('updateOnFocus', function () {
		return {
			restrict: 'A',
			scope: '=',
			link: function (scope, elem, attr) {
				console.log(scope.ingrediente);
				elem[0].focus();
				var act = attr.updateOnFocus;
				
				elem.bind('blur', function () {
					scope.ingrediente[act] = false;
					elem.unbind('blur');
				});
			}
		};
	});