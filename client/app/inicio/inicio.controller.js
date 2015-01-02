angular.module('chefExpressApp.inicio')

  .controller('inicioMainCtrl', function ($scope, $rootScope, Auth, Navbar) {
    (function updateNavbar(navbar) {
      Navbar.header = {
        title: {
          text: 'ChefExpress',
          action: '#/inicio'
        },
        options: {
          triggers: ['click'],
          data: [{text: 'Recetas', action: '#/ingredientes'}]
        }
      };

      Navbar.body = {
        title: '',
        options: {
          data: [
          //  {text: 'Nuevo', action: function () { return $scope.modal.show(); }}, 
          //  {text: 'Borrar', action: function () { return $scope.borrarIngredientesModal.show(); }},
          //  {text: 'Rehacer', action: function () { return $scope.modal.show(); }} 
          ]}
      };
      
      $rootScope.$broadcast("NavbarChange");
    })(Navbar);
  });
