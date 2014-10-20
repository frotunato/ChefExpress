angular.module('chefExpressApp.recetas')
  
  .directive('focus', function () {
    return {
      restrict: 'A',
      scope: '@',
      link: function (scope, elem, attr) {
        elem[0].focus();
        elem[0].select();
      }
    };
  });