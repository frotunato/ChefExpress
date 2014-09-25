angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ingredientesAPI) {
		$scope.ingredientes = [];
		
		$scope.familias = ['Carne', 'Frutos secos', 'Cereales', 'Leguminosas', 'Tubérculos y hortalizas', 'Frutos frescos',
		'Leche y derivados', 'Huevos', 'Azucares y dulces varios', 'Aceites y grasas', 'Pescados', 'Embutidos'];
		$scope.estados = ['Crudo', 'Seco', 'Pochado', 'Marinado', 'Frito', 'Cocido'];
		$scope.alergenos = [{nombre: 'Cereales con glute'}, {nombre: 'Leche y derivados (incluido lactosa)'}, {nombre: 'Cacahuetes'},
		{nombre: 'Huevo y derivados'}, {nombre: 'Soja'}, {nombre: 'Frutos de cascara'}, {nombre: 'Apio y derivados'}, {nombre: 'Mostaza y derivados'}, 
		{nombre: 'Sesamo'}, {nombre: 'Sulfitos'}, {nombre: 'Pescado y derivados'}, {nombre: 'Crustaceos'}, {nombre: 'Ninguno'}];

		$scope.nuevoIngrediente = {nombre: '', estado: '', familia: '', alergeno: 'Ninguno',
		precio: 0, composicion: {calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0}};

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
	
