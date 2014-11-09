angular.module('chefExpressApp.ingredientes')
	
	.directive('updateOnFocus', function () {
		return {
			restrict: 'A',
			scope: '=',
			link: function (scope, elem, attr) {
        elem[0].focus();
				var act = attr.updateOnFocus;
				
				elem.bind('blur', function () {
					scope.ingrediente[act] = false;
          elem.unbind('blur');
				});
			}
		};
	});

	/*
  .directive('onLastRepeat', function () {
  	return {
  		restrict: 'A',
  		scope: '=',
  		link: function (scope, elem, attr) {
  			if(scope.$first && scope.loading === true) {
  					setTimeout(function () {
	  					console.log('start', Date.now());
	  					elem.parent().parent().addClass('loading-container');
  					});
  				} 
  				console.log('yolo');
  				if(scope.$last && scope.loading === false) {
  					setTimeout(function() {
	  					elem.parent().parent().removeClass('loading-container');
  						console.log('finish', Date.now());
  				});
  			}
  		}
  	};
  });
  */