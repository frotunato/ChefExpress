angular.module('chefExpressApp.recetas')

  .controller('recetasMainCtrl', function ($scope, recetasAPI) {
    $scope.recetas = [];
    $scope.filtering = {};
    $scope.sorting = {nombre: 'asc'};

    $scope.familias = ['BASE', 'ARROCES', 'BEBIDA', 'CARNE', 'CEREALES', 'DESPOJOS',
    'FECULANTES', 'FRUTA COCIDA', 'FRUTA CRUDA', 'HUEVOS', 'LÁCTEO', 'LEGUMBRE',
    'PESCADO', 'SALSA', 'VERDURA COCIDA', 'VERDURA CRUDA'];

    $scope.max = 10;
    $scope.total = 0;

    getResultsPage(1);

    $scope.pagination = {
      current: 1
    };

    $scope.pageChanged = function (newPage) {
      getResultsPage(newPage);
    };

    function getResultsPage (pageNumber) {
      recetasAPI.getRecetas({
        page: pageNumber - 1,
        max: $scope.max,
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then(function (result) {
        console.log(result.total);
        $scope.total = result.total;
        $scope.recetas = result.data;
      });
    }

 
    $scope.filter = function () {
      for (var key in $scope.filtering) {
        if ($scope.filtering[key] === "" || $scope.filtering[key] === null) {
          delete $scope.filtering[key];
        }
      }
      getResultsPage($scope.pagination.current);
    };

    $scope.sort = function (inputField) {
      if($scope.sorting[inputField] === 'asc') {
        $scope.sorting[inputField] = 'desc';
      } else {
        $scope.sorting[inputField] = 'asc';
      }
      getResultsPage($scope.pagination.current);
    };

  });