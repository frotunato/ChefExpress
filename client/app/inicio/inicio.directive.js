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
        '  <ul class="menu-inicio list-unstyled">' +
        '    <li ng-click="load(opcion)" class="opcion-inicio" ng-repeat="opcion in opciones">' +
        '      <div>' +
        '        <h4 class="text-capitalize"> {{opcion}} </h4>' +
        '        <span class="glyphicon glyphicon-chevron-right"></span>' +
        '      </div>' +
        '    </li>' +
        '  </ul>' +
        '</div>',
      link: function (scope, element, attr) {
        console.log(scope.opciones);
        
        scope.load = function (option) {
          console.log($location.path());
          $location.path(option);
        };
      }
    };
  });