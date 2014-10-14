angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $modal, ingredientesAPI) {
		$scope.ingredientes =  [];
  		  	
  	$scope.familias = ['Aceites y grasas','Agua guisos','Aves y Caza','Azucares y Dulces',
    'Bebidas con Alcohol','Bebidas sin Alcohol','Bolleria y Pasteleria','Cafe, cacao e infusiones',
    'Carnes','Cereales y derivados','Condimentos y Salsas','Congelados','Conservas de frutas',
    'Despojos','Embutidos','Frutas','Frutos secos','Huevos','Lacteos y Derivados','Latas',
    'Legumbres','Mantenimiento','Mariscos y Crustaceos','Pastas alimenticias','Patatas',
    'Pescados','Precocinados','Sopas y Cremas','Verduras y hortalizas','Zumos frescos'];

  	$scope.estados = ['Crudo', 'Seco', 'Pochado', 'Marinado','Frito', 'Cocido'];
  		
  	$scope.alergenos = ['Cereales con gluten','Leche y derivados', 'Cacahuetes',
  	'Huevo y derivados', 'Soja', 'Frutos de cascara', 'Apio y derivados', 'Mostaza y derivados', 
  	'Sesamo', 'Sulfitos','Pescado y derivados', 'Crustaceos', 'Ninguno'];
		
		$scope.filtering = {};
		$scope.sorting = {nombre: 'asc'};

		$scope.max = 20;
    $scope.total = 0;

    getResultsPage(1);

    $scope.pagination = {
      current: 1
    };

    $scope.pageChanged = function (newPage) {
      getResultsPage(newPage);
    };
		
    function getResultsPage (pageNumber) {
      ingredientesAPI.getIngredientesPagina({
        page: pageNumber - 1, 
        max: $scope.max, 
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then(function (result) {
        $scope.ingredientes = result.data;
        $scope.total = result.total;
      });
    }

		$scope.actualizarIngrediente = function (id, field, data) {
			var res = {};
			res[field] = data;

			ingredientesAPI.updateIngrediente(id, res).then(function (data) {
				console.log(data);
				console.log($scope.ingredientes);
			});
		};

		$scope.crearIngrediente = function (ingrediente) {
      ingredientesAPI.addIngrediente(ingrediente).then(function (data) {
        console.log(data);
        getResultsPage($scope.pagination.current);
      });
    };

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

	/*
    $scope.chartObject = {
    	type: 'PieChart',
    	data: [
		    [ "Componente", "Cantidad" ],
		    [ "Grasas", $scope.nuevoIngrediente.composicion.grasas ],
		    [ "Proteinas", $scope.nuevoIngrediente.composicion.proteinas ],
		    [ "Carbohidratos", $scope.nuevoIngrediente.composicion.carbohidratos ],
		    [ "Calorias", $scope.nuevoIngrediente.composicion.calorias ]
  		],
  		options: {
  			title: "Desglose",
  			isStacked: "false",
  			width: 600,
  			height: 600,
  			displayExactValues: true,
  			is3D: false
  		}
    };
	*/
  
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
 
 
    //fin ingredientesMainCtrl 
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