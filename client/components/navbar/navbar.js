angular.module('chefExpressApp')

  .directive('navbar', function ($route, $location, $rootScope, Navbar, $parse, $dropdown) {
    return {
      restrict: 'E',
      scope: {
        navbarHeaderTitle: '@',
        navbarBase: '@',
        navbarOptionsTriggers: '='
      },
      template:
        '<div id="navbar-container" class="row">' +
        '  <div id="navbar-header">' +
        '    <div id="navbar-header-title">' +
        '      <h2>' +
        '        <a type="button" ng-href="{{navbar.header.title.link}}"> {{navbar.header.title.text}} </a>' +
        '      </h2>' +
        '    </div>' +
        '    <div id="navbar-header-options" ng-if="navbar.showHeader" class="navbar-links-dropdown">' +
        '      <div class="glyphicon glyphicon-th-list" navbar-dropdown="navbar.header.options"></div>' +
        '    </div>' +
        '  </div>' +
        '  <div id="navbar-body">' +
        '    <div id="navbar-body-title">' +
        '      <h3 class="text-center"> {{navbar.body.title | navbarRouteFilter}} </h3>' +
        '    </div>' +
        '    <div id="navbar-body-options" class="navbar-links-dropdown">' +
        '      <div class="glyphicon glyphicon-th" navbar-dropdown="navbar.body.options"></div>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        
        scope.navbar = {
          header: {
            title: {
              text: '' || scope.navbarHeaderTitle,
              link: '' || scope.navbarBase 
            },
            options: {
              triggers: ['click'] || scope.navbarOptionsTriggers,
              data: Navbar.header.options.data
            }
          },
          body: {
            title: Navbar.body.title,
            options: Navbar.body.options
          },
          dropdown: {
            triggers: ['click', 'hover'],
            options: [{text: 'Ingredientes', action: null}, {text: 'Recetas', action: null}, {text: 'link3', action: null}]
          }
        };

        console.log('[NAVBAR.LINK] navbar.options.data', scope.navbar.header.options.data);

        var originalLinks = scope.navbar.header.options.data;

        var getRouteLinks = function () {
          return originalLinks.filter(function (element) {
            return element.text.indexOf($location.path()) === -1;
          });
        };

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
          console.log('ELEMENT', getRouteLinks());
          if (next.$$route.originalPath === scope.navbar.header.title.link.substring(1)) {
            scope.navbar.showHeader = false;
          } else {
            scope.navbar.showHeader = true;
            scope.navbar.header.options.data = getRouteLinks();
          }
          scope.navbar.body.title = next.$$route.originalPath;
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
        '  <div ng-repeat="option in navbarDropdown.data">' +
        '    <a ng-href="{{option.link}}"> {{option.text}} </a>' +
        '  </div>' +
        '</div>',
      link: function (scope, element, attrs) {
        scope.isVisible = false;
        
        scope.load = function (link) {
          window.alert(link);
        };

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