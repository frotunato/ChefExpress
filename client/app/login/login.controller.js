angular.module('chefExpressApp.login')
  .controller('loginCtrl', function ($scope, $location, Auth) {
    $scope.credenciales = {
      usuario: '',
      password: ''
    };

    $scope.login = function () {
      if ($scope.credenciales.usuario !== '' && $scope.credenciales.password !== '') {
        Auth.login($scope.credenciales).then(
          function (response) {
            console.groupCollapsed('%cLOGIN.CONTROLLER -> LOGIN CREDENTIALS', 'background: #222; color: #bada55');
            console.log('%cUSER -> %c' + response.config.data.usuario, 'font-weight: bold', '');
            console.log('%cPASSWORD -> %c' + response.config.data.password, 'font-weight: bold', '');
            console.groupEnd('LOGIN.CONTROLLER -> LOGIN CREDENTIALS');
            $location.path('/inicio');
          
          }, 
          function (response) {
            console.error('Credenciales incorrectas');
        });
      }
    };
  });