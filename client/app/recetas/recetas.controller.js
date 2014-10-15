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
      recetasAPI.getRecetas({
        page: pageNumber - 1,
        max: $scope.max,
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then(function (result) {
        console.log(result.total);
        $scope.total = result.total;
        $scope.recetas = result.data;
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


  .controller('dummyGenerator', function ($scope, recetasAPI) {
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
      
      for (var i = 0; i < 200; i++) {
        var familiaR = $scope.familias[Math.floor(Math.random() * $scope.familias.length)];
        var categoriaR = $scope.categorias[Math.floor(Math.random() * $scope.categorias.length)];
        var procedenciaR = $scope.procedencias[Math.floor(Math.random() * $scope.procedencias.length)];
        var ambitoR = $scope.ambitos[Math.floor(Math.random() * $scope.ambitos.length)];
        var tipoR = $scope.tipos[Math.floor(Math.random() * $scope.tipos.length)];
        var precioR = ("" + Math.random() * 10).substring(0,5);
        var cantidadR = Math.floor(Math.random() * 15);
        var nombreR = "Receta de prueba " + i;
        console.log(nombreR, familiaR, categoriaR, procedenciaR, ambitoR, tipoR, precioR, cantidadR);
        
        var data = {nombre: nombreR, familia: familiaR, procedencia: procedenciaR, categoria: categoriaR,
          ambito: ambitoR, tipo: tipoR, precio: precioR, cantidad: cantidadR};
        recetasAPI.addReceta(data);
      }
    };
  })

  .controller('recetaMainCtrl', function ($scope, $routeParams, recetasAPI, ingredientesAPI) {
    $scope.recetaId = $routeParams.recetaId;

    $scope.receta = null;

    recetasAPI.getReceta($scope.recetaId).then( function (data) {
      $scope.receta = data;
    });

    $scope.ingredientesReceta = [];
    $scope.max = 5;
    $scope.total = 0;
    $scope.totalReceta = $scope.ingredientesReceta.length;
    $scope.sorting = {nombre: 'asc'};
    $scope.filtering = {};
    $scope.pagination = {
      current: 1
    };
    
    function getIngredientes (pageNumber) {
      ingredientesAPI.getIngredientesPagina({
        page: pageNumber - 1,
        max: $scope.max,
        sort: $scope.sorting,
        filter: $scope.filtering
      }).then( function (result) {
        $scope.ingredientes = result.data;
        $scope.total = result.total;
      });
    }

    $scope.add = function (ingrediente) {
      console.log(JSON.stringify(ingrediente));
      if($scope.ingredientesReceta.indexOf(ingrediente) === -1) {
        $scope.ingredientesReceta.push(ingrediente);
        console.log(JSON.stringify($scope.ingredientesReceta))
      } else {
        console.log('El ingrediente ya está añadido en la receta');
      }
    };

    $scope.pageChanged = function (newPage) {
      getIngredientes(newPage);
      $scope.pagination.current = newPage;
    };

    $scope.filter = function () {
      for (var key in $scope.filtering) {
        if ($scope.filtering[key] === "" || $scope.filtering[key] === null) {
          delete $scope.filtering[key];
        }
      }
      getIngredientes($scope.pagination.current);
    };

    /*
    $scope.getRecetas = function () {

    };
    */
    //ingredientesAPI.getIngredientes()

  });