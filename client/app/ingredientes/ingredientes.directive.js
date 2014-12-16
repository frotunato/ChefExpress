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

  .directive('multiselector', function ($compile, $parse) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        selectorData: '=',
        selectorModel: '='
      },
      link: function (scope, elem, attrs) {
        var dropdown = angular.element('<multiselector-dropdown></multiselector-dropdown>');
        scope.trackBy = attrs.trackBy;
        scope.selectorOnBlur = attrs.selectorOnBlur;
        scope.selectorOnChange = attrs.selectorOnChange;
        scope.isModded = false;
        elem.append($compile(dropdown)(scope));
        scope.options = [];
      
        scope.toggle = function (item) {
          var index = depthIndexOf(scope.options, scope.trackBy, item[scope.trackBy]);
          if (scope.options[index].check === true) {
            scope.selectorModel.splice(depthIndexOf(scope.selectorModel, scope.trackBy, item[scope.trackBy]), 1);
            scope.options[index].check = false;
            scope.isModded = true;
          } else {
            scope.selectorModel.push(item);
            scope.options[index].check = true;
            scope.isModded = true;
          }
          console.log('MODEL ->', JSON.stringify(scope.selectorModel), scope.options[index].check, index);
        };
        
        scope.$watch('selectorModel', function () {
          
          scope.options = angular.copy(scope.selectorData);
          angular.forEach(scope.options, function (option) {
            option.check = false;
            if (depthIndexOf(scope.selectorModel, scope.trackBy, option[scope.trackBy]) !== -1) {
              option.check = true;
            }
          });

        });
            
        function depthIndexOf (array, field, value) {
          var res = -1;
          for (var i = array.length - 1; i >= 0; i--) {
            if (array[i][field] === value) {
              res = i;
              break;
            }
          }
          return res;
        }
      
      }
    };
  })

  .directive('multiselectorDropdown', function ($document, $parse, $timeout) {
    return {
      template: '<div class=\'dropdown\' style="position:relative">' +
                '  <button class="form-control" style="text-align: left;" ng-click="toggleDropdown()" > {{objectArrayToString(selectorModel, \'nombre\')}} <div class="dropdownIcon"></div></button>' +
                '  <ul class="dropdownOptions" ng-show="isVisible">' +
                '    <li ng-click="toggle(option)" ng-class="option.check ? \'enabled\' : \'disabled\'" ng-repeat="option in options">' +
                '      {{option.nombre}} <span ng-if="option.check" style="float:right;" class="glyphicon glyphicon-ok"></span>' +
                '    </li>' + 
                '  </ul>' +
                '</div>',
      restrict :'E',
      replace: true,
      link: function (scope, element, attrs) {
        var isFirst = true;
        scope.isVisible = false;
        $timeout(function() {
          element.children()[0].click();
        });
        scope.objectArrayToString = function (array, prop) {
          return array.map(function (e) {
            return e[prop];
          }).join(separator=', ');
        };

        scope.toggleDropdown = function () {
          scope.isVisible = !scope.isVisible;
          $document.bind('click', function (event) {
            if (event.target.tagName === 'LI' || isFirst) {
              isFirst = false;
              return;
            }
           
            scope.$apply(function () {
              $document.unbind('click');
              scope.isVisible = false;
              isFirst = true;
             
              if (scope.isModded === true) {
                $parse(scope.selectorOnChange)(scope.$parent);
              }
              $parse(scope.selectorOnBlur)(scope.$parent);              
            });

           
          });

        };
      }
    };
  })

  .directive('stRatio',function(){
    return {
      link:function(scope, element, attr){
        var ratio=+(attr.stRatio);
        
        element.css('width',ratio+'%');
        
      }
    };
  })


  .directive('rowSelector', function () {
    return {
      restrict: 'A',
      scope: {
        rowOnSelect: '='
      },
      link: function (scope, element, attrs) {
        
        var toggleValue = function (value) {
          var pos = scope.$parent.$parent.selectedItems.indexOf(value);
          if (pos === -1) {
            scope.$parent.$parent.selectedItems.push(value);
          } else {
            scope.$parent.$parent.selectedItems.splice(pos, 1);
          }
        };

        element.bind('click', function () {
          scope.$parent.isRowSelected = !scope.$parent.isRowSelected;
          toggleValue(scope.$parent.ingrediente._id);
          console.log(scope.$parent.$parent.selectedItems);
        });
      }
    };
  });