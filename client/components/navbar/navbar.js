angular.module('chefExpressApp')

  .directive('navbar', function ($route, $location, $rootScope, Navbar, $parse, $dropdown) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        navbarHeaderTitle: '@',
        navbarBase: '@',
        navbarOptionsTriggers: '='
      },
      template:
        '<div id="navbar-container">' +
        '  <div id="navbar-header">' +
        '    <div id="navbar-header-title">' +
        '      <h3>' +
        '        <a type="button" ng-href="{{navbar.header.title.link}}"> {{navbar.header.title.text}} </a>' +
        '      </h3>' +
        '    </div>' +
      //'    <div navbar-dropdown="navbar.header.options" id="navbar-header-options" class="glyphicon glyphicon-th-list navbar-icon-dropdown" ng-if="navbar.showHeader"></div>' +
        '  </div>' +
        '  <div id="navbar-body">' +
      //'    <div id="navbar-body-title">' +
        '    <div id="navbar-body-title">' +
        '      <h3 class="text-center navbar-selectable" ng-click="bodyOption.action()" ng-repeat="bodyOption in navbar.body.options.data"> {{bodyOption.text}} </h3>' +
        '    </div>' +
      //'    <div navbar-dropdown="navbar.body.options" id="navbar-body-options" class="glyphicon glyphicon-th navbar-icon-dropdown"></div>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.navbar = {
         
        };

        var getRouteLinks = function () {
          return originalLinks.filter(function (element) {
            return element.text.indexOf($location.path()) === -1;
          });
        };
        
        $rootScope.$on('NavbarChange', function (event, next, current) {
          scope.navbar = {
            header: {
              title: {
                text: Navbar.header.title.text || 'ChefExpress',
                action: Navbar.header.title.action || angular.noop()
              },
              options: {
                triggers: Navbar.header.options.triggers || ['click'],
                data: Navbar.header.options.data || []
              }
            },
            body: {
              title: Navbar.body.title,
              options: Navbar.body.options
            }
          };
        });
        
        /*
        $rootScope.$on('$viewContentLoaded', function () {
          console.log(Navbar, 'loadeed');
        });

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
          if (next.$$route.originalPath === scope.navbar.header.title.link.substring(1)) {
            scope.navbar.showHeader = false;
          } else {
            scope.navbar.showHeader = true;
            scope.navbar.header.options.data = getRouteLinks();
          }
          scope.navbar.body.title = next.$$route.originalPath;
        });
        */
      
      }
    };
  })

  .filter('navbarRouteFilter', function () {
    return function (input) {
      if (input) {
        var res = input.replace('/', '').replace('#', '').replace(/([a-z])([A-Z])/g, '$1 $2');
        return res.charAt(0).toUpperCase() + res.substring(1);
      }
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
        '<div ng-if="isVisible" class="navbar-dropdown">' +
        '  <div ng-repeat="option in navbarDropdown.data">' +
        '    <a ng-if="!option.divisor" ng-click="option.action()"> {{option.text}} </a>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.isVisible = false;

        var toggle = function () {
          scope.isVisible = !scope.isVisible;
          scope.$digest();
        };

        element.bind('mouseenter', toggle);
        element.bind('mouseleave', toggle);
      }
    };
  });