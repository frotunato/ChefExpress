angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ingredientesAPI) {
		$scope.ingredientes = [];
		$scope.categorias = ['Carne', 'Frutos secos'];
		$scope.nuevoIngrediente = {nombre: '', estado: '', categoria: '', alergenos: [],
		composicion: {calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0}};

		ingredientesAPI.getIngredientes().then(function (data) {
			$scope.ingredientes = data;
		});

		$scope.addIngrediente = function () {
			if($scope.nuevoIngrediente['nombre'] ) {
				ingredientesAPI.addIngrediente($scope.nuevoIngrediente).then(function (data) {
					$scope.ingredientes.push(data);
				});	
			}
		}

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

	})
	
