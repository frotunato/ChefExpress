angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ingredientesAPI, $modal) {
		$scope.ingredientes = [];
		
		$scope.familias = ['Carne', 'Frutos secos', 'Cereales', 'Leguminosas', 'Tubérculos y hortalizas', 'Frutos frescos',
		'Leche y derivados', 'Huevos', 'Azucares y dulces varios', 'Aceites y grasas', 'Pescados', 'Embutidos'];
		$scope.estados = ['Crudo', 'Seco', 'Pochado', 'Marinado', 'Frito', 'Cocido'];
		$scope.alergenos = [{nombre: 'Cereales con glute'}, {nombre: 'Leche y derivados (incluido lactosa)'}, {nombre: 'Cacahuetes'},
		{nombre: 'Huevo y derivados'}, {nombre: 'Soja'}, {nombre: 'Frutos de cascara'}, {nombre: 'Apio y derivados'}, {nombre: 'Mostaza y derivados'}, 
		{nombre: 'Sesamo'}, {nombre: 'Sulfitos'}, {nombre: 'Pescado y derivados'}, {nombre: 'Crustaceos'}, {nombre: 'Ninguno'}];

		$scope.nuevoIngrediente = {nombre: '', estado: '', familia: '', alergeno: 'Ninguno',
		precio: [{valor: null}], composicion: {calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0}};

		ingredientesAPI.getIngredientes().then(function (data) {
			$scope.ingredientes = data;
		});

		$scope.addIngrediente = function () {
			if($scope.nuevoIngrediente['nombre'] ) {
				$scope.nuevoIngrediente.precio[0]['fecha'] = new Date();
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
	
    $scope.showIngredientesModal = function (data) {
    	var action = {mode: 'create'};
   	 	
   	 	if(data) {
    		action = {mode: 'edit', id: data};
    	}

    	$scope.opts = {
    		modalAction: action,
    		backdrop: true,
    		backdropClick: true,
    		dialogFade: false,
    		keyboard: true,
    		templateUrl: 'app/ingredientes/ingredienteModal',
    		controller: 'ingredienteModalCtrl',
    		size: 'lg',
    		resolve: {
    			modalInfo: function () {
    				return $scope.opts.modalAction;
    			},
    			familias: function () {
    				return $scope.familias;
    			},
    			alergenos: function () {
    				return $scope.alergenos;
    			},
    			estados: function () {
    				return $scope.estados;
    			}
    		}
    	};
    			
    	var ingredienteModalInstance = $modal.open($scope.opts);
    	ingredienteModalInstance.result.then(function (data) {
    		$scope.ingredientes.indexOf
    		$scope.ingredientes.push(data);
    		console.log('Modal accepted');
    	}, function (data) {
    		console.log('Modal closed');
    	})
    }

	})

	.controller('ingredienteModalCtrl', function (modalInfo, familias, estados, alergenos, $scope, ingredientesAPI, $modal, $modalInstance) {

		$scope.familias = familias;
		$scope.estados = estados;
		$scope.alergenos = alergenos;
		$scope.ingrediente = {};
		$scope.precioIngrediente = {valor: 0, fecha: null};
		
		if(modalInfo.mode === 'edit') {
			ingredientesAPI.getIngrediente(modalInfo['id']).then( function (ingrediente) {
				$scope.ingrediente = ingrediente;
				$scope.precioIngrediente = {valor: $scope.ingrediente.precio[$scope.ingrediente.precio.length - 1]['valor'], fecha: null};
			});
		} else {
			$scope.ingrediente = {nombre: '', estado: '', familia: '', alergeno: 'Ninguno',
		precio: [], composicion: {calorias: 0, proteinas: 0, grasas: 0, 
		carbohidratos: 0}};
		}

		$scope.ok = function () {
			$scope.precioIngrediente['fecha'] = new Date();
			$scope.ingrediente.precio.push($scope.precioIngrediente);
			if(modalInfo.mode === 'edit') {
				alert(JSON.stringify($scope.ingrediente.precio));
				alert(JSON.stringify($scope.precioIngrediente))
				ingredientesAPI.updateIngrediente($scope.ingrediente['_id'], $scope.ingrediente).then( function (data) {
					$modalInstance.close($scope.ingrediente);
				})
			
			} else {
				ingredientesAPI.addIngrediente($scope.ingrediente).then( function (data) {
					$modalInstance.close($scope.ingrediente);				
				});	
			}
			//$scope.ingrediente.precio[0]['fecha'] = new Date();
			
		};
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		}
	})