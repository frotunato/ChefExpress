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
	})

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

  .directive('multiSelector', function ($parse) {
    return {
      replace: true,
      scope: {
        selectorData: '=',
        selectorModel: '='
      },
      template: '<div> {{selectorModel}}' +
                '  <ul>' +
                '    <li ng-click="toggle($index)" ng-class="option.checked ? \'lead\' : \'lead\'" ng-repeat="option in options">' +
                '      {{option.nombre}} {{option.checked}} {{$index}}' +
                '    </li>' +
                '  </ul>' +
                '</div>',
      restrict :'E',
      link: function (scope, elem, attrs) {
        //console.log(scope.selectorModel)
        scope.options = [];
        
        angular.copy(scope.selectorData, scope.options);

        scope.toggle = function (index) {
          scope.options[index].checked = !scope.options[index].checked; 
          if (scope.options[index].checked === true && checkIfExist(scope.selectorModel, {_id: scope.options[index]._id}) === -1) {
            scope.selectorModel.push(scope.options[index]);
          } else if (scope.options[index].checked === false && checkIfExist(scope.selectorModel, {_id: scope.options[index]._id}) !== -1){
            scope.selectorModel.splice(checkIfExist(scope.selectorModel, {_id: scope.options[index]._id}), 1);
          }
          console.log(JSON.stringify(scope.selectorModel));
          
        };

        scope.$watch('selectorModel', function () {
          for (var i = scope.options.length - 1; i >= 0; i--) {
            if (checkIfExist(scope.selectorModel, {_id: scope.options[i]._id}) !== -1) {
              scope.options[i].checked = true;
              break;
            } else {
              scope.options[i].checked = false;
            }
          }
        });
        
        function checkIfExist(array, data) {
          var res = -1;
          var field = Object.keys(data)[0];
          for (var i = array.length - 1; i >= 0; i--) {
            if (array[i][field] === data[field]) {
              res = i;
              break;
            }
          }
          return res;
        }
       
        /*
        scope.$watch('selectorData', function () {
          angular.forEach(scope.selectorData, function (option) {
           // console.log(option)
            option.checked = false;
            if (checkIfExist(scope.selectorModel, {_id: option._id}) !== -1) {
              option.checked = true;
            }
          });          
        });

        function checkIfExist(array, data) {
          var res = -1;
          var field = Object.keys(data)[0];
          for (var i = array.length - 1; i >= 0; i--) {
            if (array[i][field] === data[field]) {
              res = i;
              break;
            }
          }
          return res;
        }
        
        scope.toggle = function (index, option) {
          option.checked = !option.checked;
        };
        */
        /*

        var trackBy = "";
        scope.model = $parse(attrs.selectorModel)(scope);
        scope.options = [];
        
        function checkIfExist(array, data) {
          var res = -1;
          var field = Object.keys(data)[0];
          for (var i = array.length - 1; i >= 0; i--) {
            if (array[i][field] === data[field]) {
              res = i;
              break;
            }
          }
          return res;
        }

        (function parseOptions(input) {
          var rawOptions = input;
          if(rawOptions.indexOf('track by') !== -1) {
            var temp = rawOptions.split('track by');
            console.log(scope.$parent)
            scope.options = $parse(temp[0])(scope);
            trackBy = temp[1].trim();
          } else {
            scope.options = $parse(rawOptions)(scope);
          }
        })(attrs.selectorData);

        scope.toggle = function(index, option) {
          option.checked = !option.checked;
        };

        scope.$watch('model', function () {
          angular.forEach(scope.options, function (option) {
            option.checked = false;
            if (checkIfExist(scope.model, {_id: option._id}) !== -1) {
              option.checked = true;
              console.log(option.checked);
            }
          });
        
         
        });

        scope.$watch('option', function () {
          console.log('yolo', scope.model);
        });
      

*/
      }
    };
  });
