angular.module('chefExpressApp.login')
  .controller('loginCtrl', function ($scope, $location, Auth) {
    $scope.credenciales = {
      usuario: '',
      password: ''
    };

    $scope.login = function () {
      console.log('fired login()', $scope.credenciales);
      if ($scope.credenciales.usuario !== '' && $scope.credenciales.password !== '') {
        Auth.login($scope.credenciales).then(
          function (response) {
            console.log(response, 'success');
            $location.path('/inicio');
          }, 
          function (response) {
            console.log('failure');
            console.log('Credenciales incorrectas');
        });
      }
    };
  });