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
        console.time('toto');


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
        console.timeEnd('toto');
      
      }
    };
  })

  .directive('multiselectorDropdown', function ($document, $parse, $timeout) {
    return {
      template: '<div class=\'dropdown\' style="position:relative">' +
                '  <button class="form-control" style="text-align: left;" ng-click="toggleDropdown()" > {{::objectArrayToString(selectorModel, \'nombre\')}} <div class="dropdownIcon"></div></button>' +
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

  .directive('rowSelector', function (Utils) {
    return {
      restrict: 'A',
      scope: {
        rowOnSelect: '='
      },
      link: function (scope, element, attrs) {

        (function checker (value) {
          if (Utils.depthIndexOf(scope.$parent.$parent.selectedItems, '_id', value) !== -1) {
            scope.$parent.isRowSelected = true;
          }
        })(scope.$parent.ingrediente._id);
        
        
        var toggleValue = function (value) {
          var pos = Utils.depthIndexOf(scope.$parent.$parent.selectedItems, '_id', value);
          if (pos === -1) {
            scope.$parent.$parent.selectedItems.push(value);
          } else {
            scope.$parent.$parent.selectedItems.splice(pos, 1);
          }
        };

        scope.$on('resetRow', function () {
          scope.$parent.isRowSelected = false;
        });

        element.bind('click', function () {
          scope.$parent.isRowSelected = !scope.$parent.isRowSelected;
          toggleValue({
            _id: scope.$parent.ingrediente._id, 
            nombre: scope.$parent.ingrediente.nombre
          });
        });      
      }
    
    };
  })

  .directive('rowSelectorReset', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: false,
      template: '<span class="text-center rowSelectorReset" ng-click="reset()">&#9632</span>',
      link: function (scope, element, attrs) {
        
        scope.$watch(function () {return scope.selectedItems;}, function (newValue, oldValue) {
          if (newValue.length === 0 && newValue !== oldValue) {
            scope.reset();
          }
        });  
      
        scope.reset = function () {
          scope.$broadcast('resetRow');
        };
      
      }
    };
  })

  .directive('ceAutofocus', function () {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        element[0].focus();
      }
    };
  })

  .directive('ceTrueChange', function (Utils) {
    return {
      restrict: 'A',
      scope: {
        ceTrueChange: '&',
        ceFalseChange: '&',
        ngModel: '='
      },
      link: function (scope, element, attrs) {
        scope.$evalAsync(function() {
          var originalValue = angular.copy(scope.ngModel);
          var action = angular.noop;
          var changedItems = [];
          var index = -1;
          scope.$watch(function () { return scope.ngModel; }, function (newValue, oldValue) {
            
            if (newValue !== originalValue) {
              index = Utils.depthIndexOf(changedItems, '_id', newValue.nombre);
                changedItems.push(newValue);
                console.log(changedItems);
              
              //action = scope.ceTrueChange;
            } else {
              //action = scope.ceFalseChange;
              console.log('already exist', changedItems);
            }
            action();
          }); 
        });
      }
    };
  });