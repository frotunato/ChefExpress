angular.module('chefExpressApp.recetas')

  .controller('recetasMainCtrl', function ($scope, $location, recetasAPI, initialRecetasData) {
    $scope.recetas = initialRecetasData.recetas;
    $scope.total = initialRecetasData.total;
    $scope.max = 20;
    $scope.filtering = {};
    $scope.sorting = {nombre: 'asc'};
    $scope.pagination = {current: 1};
    
    $scope.familias = ['BASE', 'ARROCES', 'BEBIDA', 'CARNE', 'CEREALES', 'DESPOJOS',
    'FECULANTES', 'FRUTA COCIDA', 'FRUTA CRUDA', 'HUEVOS', 'LÁCTEO', 'LEGUMBRE',
    'PESCADO', 'SALSA', 'VERDURA COCIDA', 'VERDURA CRUDA'];

    $scope.categorias = ['BASE', 'BEBIDA', 'CEREAL', 
    'ENTRANTE', 'GUARNICION', 'LÁCTEO', 'POSTRE', 
    'RELLENO', 'SALSA', 'SEGUNDO'];

    $scope.procedencias = ['Arabe', 'China', 'Coreana', 'Francesa', 
    'Griega', 'Indía', 'indonesia', 'Israeli', 'Italiana', 
    'Malasia', 'Marroqui', 'Mexicana', 'Portuguesa', 'Tunesina', 
    'Turca', 'Vietnamita', 'vegetariana'];

    $scope.ambitos = ['Hotel', 'bcacado entra', 'Hospital', 
    'Empresa', 'Escolares', 'Cafetarias', 'Administración',
    'Catering lujo', 'Catering avion', 'Super mercado'];

    $scope.tipos = ['Étnica', 'Vegetariana', 
    'Mediterránea', 'Normal'];

    $scope.pageChanged = function (newPage) {
      getResultsPage(newPage);
      $scope.pagination.current = newPage;
    };

    function getResultsPage (pageNumber) {
      var a = Date.now();
      recetasAPI.getRecetas({
        page: pageNumber - 1,
        max: $scope.max,
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then(function (result) {
        //console.log(result.total);
        $scope.total = result.total;
        $scope.recetas = result.data;
        var b = Date.now();
        console.log('[CONTROLADOR] Datos de la tabla de recetas obtenidos del servidor en', b-a, 'ms');
      });
    }
 
    $scope.load = function (path) {
      console.log(JSON.stringify($location));
      $location.path('/recetas/' + path);
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
    console.log('[CONTROLADOR] Número total de elementos con bind', document.getElementsByClassName("ng-binding").length);

  })

  .controller('recetaMainCtrl', function ($scope, $q, $routeParams, recetasAPI, ingredientesAPI, initialRecetaData) {
    $scope.receta = initialRecetaData.receta;
    $scope.ingredientes = [];
    $scope.max = 15;
    $scope.compTotal = {proteinas: 20, calorias: 0, grasas: 0, carbohidratos: 0};
    $scope.receta.alergenos = [];

    function cantidadTotal() {
      var res = 0;
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.receta.ingredientes[i].cantidad;
      }
      $scope.receta.cantidad = res;
    }

    function precioTotal () {
      var res = 0;
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.receta.ingredientes[i].ingrediente.precio * $scope.receta.ingredientes[i].cantidad;
      }
      $scope.receta.precio = res;
    }

    function alergenosTotal () {
      var res = [];
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        if(res.indexOf($scope.receta.ingredientes[i].ingrediente.alergeno) === -1) {
          res.push($scope.receta.ingredientes[i].ingrediente.alergeno);
        }
      }
      $scope.receta.alergenos = res;
    }

    function composicionTotal () {
      var totalCalorias = 0, totalProteinas = 0, totalCarbohidratos = 0, totalGrasas = 0;
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        totalCalorias += ($scope.receta.ingredientes[i].cantidad*10)*($scope.receta.ingredientes[i].ingrediente.composicion.calorias);
        totalCarbohidratos += ($scope.receta.ingredientes[i].cantidad*10)*($scope.receta.ingredientes[i].ingrediente.composicion.carbohidratos);
        totalGrasas += ($scope.receta.ingredientes[i].cantidad*10)*($scope.receta.ingredientes[i].ingrediente.composicion.grasas);
        totalProteinas += ($scope.receta.ingredientes[i].cantidad*10)*($scope.receta.ingredientes[i].ingrediente.composicion.proteinas);
      }
      $scope.compTotal = {proteinas: totalProteinas, grasas: totalGrasas, carbohidratos: totalCarbohidratos, calorias: totalCalorias};
      console.log('proteinas', $scope.compTotal.proteinas);
    }

    $scope.calcularTotal = function() {
      cantidadTotal();
      precioTotal();
      composicionTotal();
      alergenosTotal();
    };
    
    $scope.calcularTotal();
    $scope.ingredienteSeleccionado = "";
    
    $scope.familias = ['BASE', 'ARROCES', 'BEBIDA', 'CARNE', 'CEREALES', 'DESPOJOS',
    'FECULANTES', 'FRUTA COCIDA', 'FRUTA CRUDA', 'HUEVOS', 'LÁCTEO', 'LEGUMBRE',
    'PESCADO', 'SALSA', 'VERDURA COCIDA', 'VERDURA CRUDA'];
    
    $scope.categorias = ['BASE', 'BEBIDA', 'CEREAL', 
    'ENTRANTE', 'GUARNICION', 'LÁCTEO', 'POSTRE', 
    'RELLENO', 'SALSA', 'SEGUNDO'];
    
    $scope.procedencias = ['Arabe', 'China', 'Coreana', 'Francesa', 
    'Griega', 'Indía', 'indonesia', 'Israeli', 'Italiana', 
    'Malasia', 'Marroqui', 'Mexicana', 'Portuguesa', 'Tunesina', 
    'Turca', 'Vietnamita', 'vegetariana'];
    
    $scope.ambitos = ['Hotel', 'bcacado entra', 'Hospital', 
    'Empresa', 'Escolares', 'Cafetarias', 'Administración',
    'Catering lujo', 'Catering avion', 'Super mercado'];
    
    $scope.tipos = ['Étnica', 'Vegetariana', 
    'Mediterránea', 'Normal'];

    $scope.tratamientos = ['AL HORNO', 'TERMOSELLAR', 'TRADICIONAL', 'VACIO', 'PASTERIZAR', 'ESTERILIZAR', 'REHIDRATAR', 'CONGELAR'];

    $scope.getIngredientes = function (value) {
      if(value !== "") {
        ingredientesAPI.getIngredientesPagina({
          page: undefined,
          max: $scope.max,
          sort: {nombre: 'asc'},
          filter: {nombre: value}
        }).then( function (result) {
          $scope.ingredientes = result.data;
        });
        return $scope.ingredientes;
      }
    };

    $scope.updateReceta = function (id, data) {
     console.log(JSON.stringify(data));
     recetasAPI.updateReceta(id, data).then(function (response) {
        $scope.receta.ingredientes[data.field] = data.value;
     });
    };  

    function checkIfExist (data, key, subKey ,value, callback) {
      var res = null;
      var index = null;
      if(data.length === 0) {
        res = false;
      } else {
        for (var i = data.length - 1; i >= 0; i--) {
          if( data[i][key][subKey] === value ) {
            res = true;
            index = i;
            break; 
          } else {
            res = false;
          }
        }
      }
      callback(res, index);
    }

    $scope.addIngrediente = function ($item) {    
      checkIfExist($scope.receta.ingredientes, 'ingrediente', '_id', $item._id, function (exist) {
        if (exist === true) {
          console.log('[CONTROLADOR] Ya existe el ingrediente ' + $item._id + ' en la receta');
        } else {
          recetasAPI.updateReceta($scope.receta._id, {field: 'ingredientes', value: 'add', ref: $item._id}).then(function (response) {
            $scope.receta.ingredientes.push({ingrediente: $item, cantidad: 0, _id: response.data});
            $scope.ingredienteSeleccionado = "";
            console.log('[CONTROLADOR] Añadido ingrediente ' + $item._id + ' a la receta');
            alergenosTotal();
          });
        }
      });
    };

    $scope.removeIngrediente = function (ingrediente, $index) {
      recetasAPI.updateReceta($scope.receta._id, {field: 'ingredientes', value: 'remove', ref: ingrediente._id}).then(function (response) {
        console.log('array', $scope.receta.ingredientes, 'index', $index);
        $scope.receta.ingredientes.splice($index, 1);
        $scope.calcularTotal();
      });
    };

    $scope.updateIngrediente = function (ingrediente, $index) {
      var data = {field: 'cantidad', value: ingrediente.cantidad, ref: ingrediente._id};
      recetasAPI.updateReceta($scope.receta._id, data).then(function (response) {
        $scope.receta.ingredientes[$index][data.field] = data.value;
      });
    };
  });