angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ngTableParams, ingredientesAPI) {
		$scope.ingredientes =  [];
  		  	
  	$scope.familias = ['Carne', 'Frutos secos', 'Cereales', 'Leguminosas', 
  	'Tubérculos y hortalizas', 'Frutos frescos', 'Leche y derivados', 'Huevos', 
  	'Azúcares y dulces varios', 'Aceites y grasas', 'Pescados', 'Embutidos'];

  	$scope.estados = ['Crudo', 'Seco', 'Pochado', 'Marinado','Frito', 'Cocido'];
  		
  	$scope.alergenos = ['Cereales con gluten','Leche y derivados', 'Cacahuetes',
  	'Huevo y derivados', 'Soja', 'Frutos de cascara', 'Apio y derivados', 'Mostaza y derivados', 
  	 'Sesamo', 'Sulfitos','Pescado y derivados', 'Crustaceos', 'Ninguno'];
  		
		$scope.busquedaNombre = '';
		
		$scope.filtering = {};
		$scope.sorting = {nombre: 'desc'};
/*
		$scope.search = function () {
			if($scope.busquedaNombre === "") {
				$scope.filtering['filterByField'] = null;
				$scope.filtering['filterCriteria'] = null;
			} else {
				$scope.filtering['filterByField'] = 'nombre';
				$scope.filtering['filterCriteria'] = $scope.busquedaNombre;
			}
			$scope.tablaIngredientes.reload();	
		}
*/
		$scope.tablaIngredientes = new ngTableParams({
			page: 1,
			count: 20
		}, {
			data: $scope.ingredientes,
			total: 0,
			counts: [10, 20, 35, 50, 80, 100],
			getData: function ($defer, params) {		
				ingredientesAPI.getIngredientesPagina({
					page: params.page() - 1, 
					max: params.count(), 
					sort: $scope.sorting,
					filter: $scope.filtering
				}).then(function (result) {
					$scope.ingredientes = result.data;
					params.total(result.total);
					$defer.resolve(result.data);
				});
			}
		});
		
		//alert(JSON.stringify($scope.tablaIngredientes.settings()))

		$scope.actualizarIngrediente = function (id, field, data) {
			var res = {};
			res[field] = data;

			ingredientesAPI.updateIngrediente(id, res).then(function (data) {
				console.log(data)
				console.log($scope.ingredientes)
			});
		}

		$scope.filter = function () {
			for (var key in $scope.filtering) {
				if ($scope.filtering[key] === "" || $scope.filtering[key] === null) {
					delete $scope.filtering[key];
				}
			}
			$scope.tablaIngredientes.reload();
		}

		$scope.sort = function (inputField) {
			if($scope.sorting[inputField] === 'asc') {
				$scope.sorting[inputField] = 'desc';
			} else {
				$scope.sorting[inputField] = 'asc';
			}
			$scope.tablaIngredientes.reload();
		}

		$scope.a = function () {
			alert('a')
		}

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
   
 

   });