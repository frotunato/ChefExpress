angular.module('chefExpressApp')

  .directive('navbar', function ($route, $location, $rootScope, Navbar) {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      template: 
        '<div id="navbar-wrapper" class="navbar-container row">' +
        '  <div class="btn-group" dropdown>' +
        '    <a type="button" class="navbar-header-element glyphicon glyphicon-home"></a>' +
        '    <a type="button" dropdown-toggle class="navbar-header-element glyphicon glyphicon-align-justify"></a>' +
        '    <ul class="dropdown-menu" role="menu">' +
        '      <li ng-repeat="option in options">' +
        '        <a href> {{option}} </a>' +
        '      </li>' + 
        '    </ul>' + 
        '  </div>' +
        '  <h3 class="text-center col-md-1 navbar-title"> {{area | navbarRouteFilter}} </h3>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.showHome = Navbar.isHomeVisible;
        scope.area = Navbar.area;
        
        /*
        scope.$watch(Navbar.area, function () {
          console.log('Changed', Navbar.area);
          //scope.$digest();
        });
        */
        /*
        scope.$watch(
          function () {
            return $location.path();
        }, function () {
          scope.area = Navbar.area;
          console.log(JSON.stringify($location));
        });
        */
        $rootScope.$on('$routeChangeSuccess', function (event, next, current) {
          console.log('[NAVBAR.LINK] next', next);
          scope.area = next.$$route.originalPath;
        });
      }
    };
  })

  .filter('navbarRouteFilter', function () {
    return function (input) {
      var res = input.replace('/', '').replace(/([a-z])([A-Z])/g, '$1 $2');
      return res.charAt(0).toUpperCase() + res.substring(1);
    };
  });