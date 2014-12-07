angular.module('chefExpressApp')

  .directive('navbar', function ($route, $location, $rootScope, Navbar, $parse, $dropdown) {
    return {
      restrict: 'E',
      scope: {
        base: '=',
        navbarLinks: '='
      },
      template:
        '<div id="navbar-container" class="row">' +
        '  <div id="navbar-header" ng-if="navbar.showHeader">' +
        '    <div id="navbar-home">' +
        '      <h2>' +
        '        <a type="button" ng-href="{{navbar.base}}"> ChefExpress </a>' +
        '      </h2>' +
        '      <div id="navbar-links-dropdown">' +
        '        <div class="caret" navbar-dropdown="navbar.dropdown"></div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '  <h3 class="text-center"> {{navbar.area}} </h3>' +
        '</div>',
      link: function (scope, element, attrs) {
        var originalLinks = angular.copy(scope.navbarLinks);

        var getRouteLinks = function () {
          return originalLinks.filter(function (element) {
            return element.indexOf($location.path()) === -1;
          });
        };

        scope.navbar = {
          showHeader: true,
          area: Navbar.area,
          base: attrs.navbarHome,
          dropdown: {
            triggers: ['click', 'hover'],
            options: [{text: 'Ingredientes', action: null}, {text: 'Recetas', action: null}, {text: 'link3', action: null}]
          }
        };
        
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
          console.log('ELEMENT', getRouteLinks());
          if (next.$$route.originalPath === scope.navbar.base.substring(1)) {
            scope.navbar.showHeader = true;
          } else {
            scope.navbar.showHeader = true;
            scope.navbar.links = getRouteLinks();
          }
          scope.navbar.area = next.$$route.originalPath;
        });
      
      }
    };
  })

  .filter('navbarRouteFilter', function ($compile) {
    return function (input) {
      var res = input.replace('/', '').replace('#', '').replace(/([a-z])([A-Z])/g, '$1 $2');
      return res.charAt(0).toUpperCase() + res.substring(1);
    };
  })

  .directive('navbarDropdown', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        navbarDropdown: '=navbarDropdown'
      },
      template: 
        '<div ng-if="isVisible" class="">' +
        '  <div ng-repeat="option in navbarDropdown.options">' +
        '    <a ng-click="option.action"> {{option.text}} </a>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.isVisible = false;
        
        var toggle = function () {
          scope.isVisible = !scope.isVisible;
          scope.$digest();
        };
        var handler = function () {
          toggle();
          console.log('[NAVBAR.DROPDOWN] options', scope.isVisible);
        };

        element.bind('mouseenter', handler);
        element.bind('mouseleave', handler);
      }
    };
  });