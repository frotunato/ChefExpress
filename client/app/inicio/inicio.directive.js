angular.module('chefExpressApp.inicio')
  
  .directive('menuInicio', function ($location, $route) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        opciones: '='
      },
      template: 
        '<div class="wrapperMenuInicio">' +
        '  <ul id="menu-inicio" class="list-unstyled">' +
        '    <li ng-mouseenter="showIcon = true" ng-mouseleave="showIcon = false" ng-click="load(opcion)" class="opcion-inicio" ng-repeat="opcion in opciones">' +
        '      <h4 class="text-capitalize text-center"> {{opcion}} </h4>' +
        '      <span ng-if="showIcon" class="glyphicon glyphicon-chevron-right"></span>' +
        '    </li>' +
        '  </ul>' +
        '</div>',
      link: function (scope, element, attr) {
        scope.showIcon = false;
        scope.load = function (option) {
          $location.path(option);
        };
      }
    };
  });