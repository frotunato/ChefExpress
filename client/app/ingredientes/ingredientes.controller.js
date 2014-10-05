angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ngTableParams, ingredientesAPI) {
		$scope.ingredientes =  [];
  		$scope.familias = [{nombre: 'Carne'}, {nombre: 'Frutos secos'}, {nombre: 'Cereales'}, {nombre: 'Leguminosas'}, {nombre: 'Tubérculos y hortalizas'}, {nombre: 'Frutos frescos'}, 
  		{nombre: 'Leche y derivados'}, {nombre: 'Huevos'}, {nombre: 'Azucares y dulces varios'}, {nombre: 'Aceites y grasas'}, {nombre: 'Pescados'}, 
  		{nombre: 'Embutidos'}];
  		
  		$scope.estados = [{nombre: 'Crudo'}, {nombre: 'Seco'}, {nombre: 'Pochado'}, {nombre: 'Marinado'},
  		{nombre: 'Frito'}, {nombre: 'Cocido'}];
  		
  		$scope.alergenos = [{nombre: 'Cereales con gluten'}, {nombre: 'Leche y derivados'}, {nombre: 'Cacahuetes'},
  		{nombre: 'Huevo y derivados'}, {nombre: 'Soja'}, {nombre: 'Frutos de cascara'}, {nombre: 'Apio y derivados'}, {nombre: 'Mostaza y derivados'}, 
  		{nombre: 'Sesamo'}, {nombre: 'Sulfitos'}, {nombre: 'Pescado y derivados'}, {nombre: 'Crustaceos'}, {nombre: 'Ninguno'}];
  		
  	$scope.filtering = {filterByField: null, filterCriteria: null};
		$scope.sorting = {sortByField: 'nombre', sortCriteria: 'asc'};
		$scope.busquedaNombre = '';
		$scope.filtro = {};
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

		$scope.tablaIngredientes = new ngTableParams({
			page: 1,
			count: 20,
		}, {
			data: $scope.ingredientes,
			total: 0,
			counts: [10, 20, 35, 50, 80, 100],
			getData: function ($defer, params) {		
				ingredientesAPI.getIngredientesPagina({
					page: params.page() - 1, 
					max: params.count(), 
					sorting: $scope.sorting,
					filtering: $scope.filtering
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

		$scope.filter = function (filterField, filterCriteria) {
			var newFilter = null;
			$scope.filtering['filterByField'] = filterField;
			$scope.filtering['filterCriteria'] = filterCriteria;
			$scope.tablaIngredientes.reload();
		}

		$scope.sort = function (inputField) {
			var newOrder = null;
			if($scope.sorting['sortCriteria'] === 'asc') {
				var newOrder = 'desc';
			} else {
				var newOrder = 'asc';
			}
			$scope.sorting[inputField] = inputField;
			$scope.sorting['sortCriteria'] = newOrder;
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