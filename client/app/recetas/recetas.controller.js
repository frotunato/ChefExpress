angular.module('chefExpressApp.recetas')

  .controller('recetasMainCtrl', function ($scope, $location, recetasAPI) {
    $scope.recetas = [];
    $scope.filtering = {};
    $scope.sorting = {nombre: 'asc'};

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

    $scope.max = 20;
    $scope.total = 0;

    getResultsPage(1);

    $scope.pagination = {
      current: 1
    };

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

  })
  .controller('dummyGenerator', function ($scope, recetasAPI, ingredientesAPI) {
    $scope.pool = [];
/*
   $scope.getIngredientes = function (value) {
     if(value !== "") {
       ingredientesAPI.getIngredientesPagina({
         page: undefined,
         max: 1317,
         sort: {nombre: 'asc'},
         filter: {}
       }).then( function (result) {
        $scope.pool = result.data;
        for (var i = 0; i < 700; i++) {
          var familiaR = $scope.familias[Math.floor(Math.random() * $scope.familias.length)];
          var categoriaR = $scope.categorias[Math.floor(Math.random() * $scope.categorias.length)];
          var procedenciaR = $scope.procedencias[Math.floor(Math.random() * $scope.procedencias.length)];
          var tipoR = $scope.tipos[Math.floor(Math.random() * $scope.tipos.length)];
          var ambitoR = $scope.ambitos[Math.floor(Math.random() * $scope.ambitos.length)];
          var precioR = ("" + Math.random() * 10).substring(0,5);
          var cantidadR = Math.floor(Math.random() * 15);
          var nombreR = "Receta de prueba " + i;
          var ingredientesR = [];
          for (var k = 7; k >= 0; k--) {
            ingredientesR.push({ingrediente: $scope.pool[Math.floor(Math.random() * 1317)]._id, cantidad: Math.floor(Math.random()*20)});
          }
          
          //console.log(nombreR, familiaR, categoriaR, procedenciaR, ambitoR, tipoR, precioR, cantidadR, JSON.stringify(ingredientesR));
          
          var data = {nombre: nombreR, familia: familiaR, procedencia: procedenciaR, categoria: categoriaR,
            ambito: ambitoR, tipo: tipoR, precio: precioR, cantidad: cantidadR, ingredientes: ingredientesR};
          recetasAPI.addReceta(data);
        }         

       });
       return $scope.ingredientes;
  

     }
   };
   */
   $scope.getIngredientes();
    

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
  
    $scope.dummy = function () {
      
     // console.log(familiaR, categoriaR, procedenciaR, ambitoR, tipoR, precioR, cantidadR);
      
   
    };
  })

  .controller('recetaMainCtrl', function ($scope, $q, $routeParams, recetasAPI, ingredientesAPI) {
    $scope.ingredientes = [];
    $scope.max = 15;
    $scope.receta = null;
    
    $scope.cantidadTotal = function() {
      var res = 0;
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.receta.ingredientes[i].cantidad;
      }
      $scope.receta.cantidad = res;
      precioTotal();
    };

    function precioTotal () {
      var res = 0;
      for (var i = $scope.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.receta.ingredientes[i].ingrediente.precio * $scope.receta.ingredientes[i].cantidad;
      }
      $scope.receta.precio = res;
    }

    $scope.ingredienteSeleccionado = "";
    
    recetasAPI.getReceta($routeParams.recetaId).then(function (data) {
      $scope.receta = data;
      precioTotal();
      $scope.cantidadTotal();
    });

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

    $scope.actualizarReceta = function (id, data) {
      console.log(JSON.stringify(data));
      recetasAPI.updateReceta(id, data).then(function (result) {
        console.log(result.ingredientes);
      });
    };  

    function checkIfExist (data, key, subKey ,value, callback) {
      var res = null;
      if(data.length === 0) {
        res = false;
      } else {
        for (var i = data.length - 1; i >= 0; i--) {
          if( data[i][key][subKey] === value ) {
            res = true;
            break; 
          } else {
            res = false;
          }
        }
      }
      callback(res);
    }

    $scope.add = function ($item) {
      console.log('aaa', $scope.receta.ingredientes);
     $scope.actualizarReceta($scope.receta._id, {field: 'ingrediente', value: $item._id});
      //$scope.actualizarReceta($scope.receta._id, {field: {ingrediente: $item._id}});  
      $scope.receta.ingredientes.push({ingrediente: $item, cantidad: 0});
      precioTotal();
      $scope.ingredienteSeleccionado = "";
    
      checkIfExist($scope.receta.ingredientes, 'ingrediente', '_id', $item._id, function (exist) {
        console.log(exist);
        /*
        if (exist === true) {
          console.log('El ingrediente ya existe');
        } else {
          $scope.actualizarReceta($scope.receta._id, {ingredientes: {ingrediente: $item._id}});  
        }
        */

      });
    };

  });