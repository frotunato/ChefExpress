angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, ngTableParams, ingredientesAPI) {
		$scope.ingredientes = [];
		
		$scope.familias = [{nombre: 'Carne'}, {nombre: 'Frutos secos'}, {nombre: 'Cereales'}, {nombre: 'Leguminosas'}, {nombre: 'Tubérculos y hortalizas'}, {nombre: 'Frutos frescos'}, 
		{nombre: 'Leche y derivados'}, {nombre: 'Huevos'}, {nombre: 'Azucares y dulces varios'}, {nombre: 'Aceites y grasas'}, {nombre: 'Pescados'}, 
		{nombre: 'Embutidos'}];
		
		$scope.estados = [{nombre: 'Crudo'}, {nombre: 'Seco'}, {nombre: 'Pochado'}, {nombre: 'Marinado'},
		{nombre: 'Frito'}, {nombre: 'Cocido'}];
		
		$scope.alergenos = [{nombre: 'Cereales con gluten'}, {nombre: 'Leche y derivados'}, {nombre: 'Cacahuetes'},
		{nombre: 'Huevo y derivados'}, {nombre: 'Soja'}, {nombre: 'Frutos de cascara'}, {nombre: 'Apio y derivados'}, {nombre: 'Mostaza y derivados'}, 
		{nombre: 'Sesamo'}, {nombre: 'Sulfitos'}, {nombre: 'Pescado y derivados'}, {nombre: 'Crustaceos'}, {nombre: 'Ninguno'}];
		
		// this should match however many results your API puts on one page

		$scope.tablaIngredientes = new ngTableParams({
			page: 1,
			count: 25,
			sorting: {
				field: 'composicion.carbohidratos',
				order: 'asc'
			}
		}, {
			total: 0,
			getData: function ($defer, params) {		
				ingredientesAPI.getIngredientesPagina(params.page() - 1, params.count(), params.sorting().field, params.sorting().order).then( function (result) {
					params.total(result.total);
					$defer.resolve(result.data);
				});
			}
		});

		$scope.actualizarIngrediente = function (id, field, data) {
			var res = {};
			res[field] = data;
			console.log(JSON.stringify(res), field, data);
			ingredientesAPI.updateIngrediente(id, res).then(function (data) {
			});
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