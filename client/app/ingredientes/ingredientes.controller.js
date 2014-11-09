angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $modal, initialData, ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI) {
    $scope.ingredientes = {
      data: initialData.ingredientes.data,
      total: initialData.ingredientes.total,
      familias: initialData.familias,
      alergenos: initialData.alergenos,
      intolerancias: initialData.intolerancias
    };

    $scope.table = {
      filtering: {},
      sorting: {nombre: 'asc'},
      max: 20,
      pagination: 0
    };

    function getResultsPage (newPage) {
      ingredientesAPI.getIngredientesPagina({
        page: newPage, 
        max: $scope.table.max, 
        sort: $scope.table.sorting,
        filter: $scope.table.filtering
      }).then(function (response) {
        $scope.ingredientes.data = response.data.ingredientes;
        $scope.ingredientes.total = response.data.total;
        $scope.$scope.table.pagination = newPage;
      });
    }

    $scope.pageChanged = function (newPage) {
      getResultsPage(newPage - 1);
    };

    $scope.updateIngrediente = function (id, data) {
      console.log('DATA ' + JSON.stringify(data));
      
      //if (data.hasOwnProperty('familia')) {
      //  data.familia = data.familia._id;
      //} else 
      if (data.hasOwnProperty('alergenos')) {
        valores = data.alergenos.map(function (alergeno) {
          return alergeno._id;
        });
        data.alergenos = valores;
      }
      
      ingredientesAPI.updateIngrediente(id, data).then(function (response) {
        console.log('[CONTROLADOR_INGREDIENTES] updateIngrediente: ' + JSON.stringify(data));
      }); 
    };

		$scope.crearIngrediente = function (ingrediente) {
      if (ingrediente.hasOwnProperty('familia') && ingrediente.hasOwnProperty('alergenos')) {
        delete(ingrediente.familia.nombre);
      }
      
      ingredientesAPI.addIngrediente(ingrediente).then(function (response) {
        getResultsPage($scope.table.pagination);
      });
    
    };

    $scope.getAlergenos = function () {
      alergenosIngredienteAPI.getAlergenos().then(function (response) {
        $scope.ingredientes.alergenos = response.data;
      });
    };

    //$scope.getAlergenos();

    $scope.getFamilias = function () {
      familiasIngredienteAPI.getFamilias().then(function (response) {
        $scope.ingredientes.familias = response.data;
      });
    };

    $scope.objectArrayToString = function (array, prop) {
      return array.map(function (e) {
        return e[prop];
      }).join(separator=', ');
    };

    $scope.filter = function () {
      for (var key in $scope.table.filtering) {
        if ($scope.table.filtering[key] === "" || $scope.table.filtering[key] === null) {
          delete $scope.table.filtering[key];
        }
      }
      getResultsPage($scope.table.pagination);
		};

		$scope.sort = function (inputField) {
      if($scope.table.sorting[inputField] === 'asc') {
				$scope.table.sorting[inputField] = 'desc';
			} else {
				$scope.table.sorting[inputField] = 'asc';
			}
      getResultsPage($scope.table.pagination);
		};
  
    $scope.showModal = function () {
      $scope.opts = {
        backdrop: true,
        backdropClick: true,
        dialogFade: false,
        keyboard: true,
        templateUrl: 'app/ingredientes/nuevoIngrediente',
        controller: 'ingredientesModalCtrl',
        size: 'md',
        resolve: {
          initData: function () {
            return {
              estados: $scope.estados, 
              alergenos: $scope.alergenos, 
              familias: $scope.familias,
              intolerancias: $scope.intolerancias
            };
          }
        }
      };
                
      var modalInstance = $modal.open($scope.opts);
      modalInstance.result.then(
        function (result) {
          console.log('Modal accepted', JSON.stringify(result));
          $scope.crearIngrediente(result);
        }, 
        function () {
          console.log('Modal closed');
        });
    };

  })
  
  .controller('ingredientesModalCtrl', function ($scope, $modal, $modalInstance, initData) {
    $scope.ingrediente = {
      data: {},
      familias: initData.familias,
      estados: initData.estados,
      alergenos: initData.alergenos,
      intolerancias: initData.intolerancias
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
      $modalInstance.close($scope.ingrediente.data);
    };

  });