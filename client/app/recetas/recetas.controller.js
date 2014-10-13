angular.module('chefExpressApp.recetas')

  .controller('recetasMainCtrl', function ($scope, ngTableParams, recetasAPI) {
    $scope.recetas = [];
    $scope.filtering = {};
    $scope.sorting = {nombre: 'asc'};

    $scope.familias = ['BASE', 'ARROCES', 'BEBIDA', 'CARNE', 'CEREALES', 'DESPOJOS',
    'FECULANTES', 'FRUTA COCIDA', 'FRUTA CRUDA', 'HUEVOS', 'LÁCTEO', 'LEGUMBRE',
    'PESCADO', 'SALSA', 'VERDURA COCIDA', 'VERDURA CRUDA'];

    $scope.tablaRecetas = new ngTableParams({
      page: 1,
      count: 20
    }, {
      data: $scope.recetas,
      total: 0,
      counts: [10,20,35,50,80,100],
      getData: function ($defer, params) {
        recetasAPI.getRecetas({
          page: params.page() - 1,
          max: params.count(),
          sort: $scope.sorting,
          filter: $scope.filtering
        }).then(function (result) {
          $scope.recetas = result.data;
          params.total(result.total);
          $defer.resolve(result.data);
        });
      }
    });
    
    $scope.a = function () {
      alert('aa');
    };

    $scope.filter = function () {
      for (var key in $scope.filtering) {
        if ($scope.filtering[key] === "" || $scope.filtering[key] === null) {
          delete $scope.filtering[key];
        }
      }
      $scope.tablaRecetas.reload();
    };

    $scope.sort = function (inputField) {
      if($scope.sorting[inputField] === 'asc') {
        $scope.sorting[inputField] = 'desc';
      } else {
        $scope.sorting[inputField] = 'asc';
      }
      $scope.tablaRecetas.reload();
    };

  });