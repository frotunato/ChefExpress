angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $modal, initialIngredientesData, initialAlergenos, initialFamilias, ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI) {
		$scope.ingredientes =  initialIngredientesData.ingredientes;
    $scope.total = initialIngredientesData.total;
  	$scope.familias = initialFamilias;
    $scope.alergenos = initialAlergenos;
    $scope.filtering = {};
		$scope.sorting = {nombre: 'asc'};

		$scope.max = 20;

    var pagination = 0;

    function getResultsPage (newPage) {
      ingredientesAPI.getIngredientesPagina({
        page: newPage, 
        max: $scope.max, 
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then(function (result) {
        $scope.ingredientes = result.data;
        $scope.total = result.total;
        pagination = newPage;
      });
    }

    $scope.pageChanged = function (newPage) {
      getResultsPage(newPage - 1);
    };

    $scope.updateIngrediente = function (id, data) {
      console.log('DATA ' + JSON.stringify(data));
      
      if (data.hasOwnProperty('familia')) {
        data.familia = data.familia._id;
      } else if (data.hasOwnProperty('alergenos')) {
        valores = data.alergenos.map(function (alergeno) {
          return alergeno._id;
        });
        data.alergenos = valores;
      }
      
      ingredientesAPI.updateIngrediente(id, data).then(function (result) {
        console.log('[CONTROLADOR_INGREDIENTES] updateIngrediente: ' + JSON.stringify(data));
      }); 
    };

		$scope.crearIngrediente = function (ingrediente) {
      if (ingrediente.hasOwnProperty('familia') && ingrediente.hasOwnProperty('alergenos')) {
        delete(ingrediente.familia.nombre);
        ingrediente.alergenos.forEach(function (value, index) {
          console.log(value);
        });
      }
      
      ingredientesAPI.addIngrediente(ingrediente).then(function (data) {
        console.log(data);
        getResultsPage(pagination);
      });
    
    };

    console.log(JSON.stringify(alergenosIngredienteAPI));
    
    $scope.getAlergenos = function () {
      alergenosIngredienteAPI.getAlergenos().then(
        function (data) {
          $scope.alergenos = data;
          console.log('alergenos', JSON.stringify($scope.alergenos));
        }, 
        function (err) {
        console.log(err);
      });
    };

    //$scope.getAlergenos();

    $scope.getFamilias = function () {
      familiasIngredienteAPI.getFamilias().then(
        function (data) {
          $scope.familias = data;
          console.log('familias', JSON.stringify($scope.familias));
        },
        function (err) {
          console.log(err);
      });
    };

    $scope.a = function () {
      console.log('a');
    };

    $scope.objectArrayToString = function (array, prop) {
      return array.map(function (e) {
        return e[prop];
      }).join(separator=', ');
    };

    $scope.filter = function () {
      for (var key in $scope.filtering) {
        if ($scope.filtering[key] === "" || $scope.filtering[key] === null) {
          delete $scope.filtering[key];
        }
      }
      getResultsPage(pagination);
		};

		$scope.sort = function (inputField) {
			console.log('[CONTROLADOR] Filtrado por ' + JSON.stringify($scope.sorting));
      if($scope.sorting[inputField] === 'asc') {
				$scope.sorting[inputField] = 'desc';
			} else {
				$scope.sorting[inputField] = 'asc';
			}
      getResultsPage(pagination);
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
          informacionIngrediente: function () {
            return {estados: $scope.estados, alergenos: $scope.alergenos, familias: $scope.familias};
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
  
      $scope.aa = function () {
        yolo2.map(function (ss) {
          ingredientesAPI.addIngrediente(ss).then(function (data) {});
        });
          
      };
      
  })
  
  .controller('ingredientesModalCtrl', function ($scope, $modal, $modalInstance, informacionIngrediente) {
    $scope.familias = informacionIngrediente.familias;
    $scope.estados = informacionIngrediente.estados;
    $scope.alergenos = informacionIngrediente.alergenos;

    $scope.ingrediente = {};

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
      $modalInstance.close($scope.ingrediente);
    };

  });