angular.module('chefExpressApp.recetas')

  .controller('recetasMainCtrl', function ($scope, $location, recetasAPI, initialData, ingredientesAPI) {
    console.log(initialData);
    $scope.data = {
      recetas: initialData.recetas.data,
      totalRecetas: initialData.recetas.total,
      familias: initialData.familias,
      categorias: initialData.categorias,
      ambitos: initialData.ambitos,
      tipos: initialData.tipos,
      procedencias: initialData.procedencias
    };

    $scope.table = {
      filtering: {
        value: {},
        filter: function () {
          for (var key in this.value) {
            if (this.value[key] === "" || this.value[key] === null) {
              delete this.value[key];
            }
          }
          $scope.table.pagination.getResultsPage($scope.table.pagination.page);
        }

      },
      sorting: {
        value: {nombre: 'asc'},
        sort: function (inputField) {
          if(this.value[inputField] === 'asc') {
            this.value[inputField] = 'desc';
          } else {
            this.value[inputField] = 'asc';
          }
          $scope.table.pagination.getResultsPage($scope.table.pagination.page);
        }
      },
      pagination: {
        max: 25,
        page: 1,
        getResultsPage: function (newPage) {
          recetasAPI.getRecetas({
            page: newPage - 1,
            max: this.max,
            sort: $scope.table.sorting.value,
            filter: $scope.table.filtering.value
          }).then(function (response) {
            $scope.data.recetas = response.data.recetas;
            $scope.data.totalRecetas = response.data.total;
            this.page = newPage - 1;
          });
        }
      }
    };

    $scope.load = function (path) {
      console.log(JSON.stringify($location));
      $location.path('/recetas/' + path);
    };

  })

  .controller('recetaMainCtrl', function ($scope, $q, $routeParams, recetasAPI, ingredientesAPI, initialData) {
    $scope.data = {
      receta: initialData,
      alergenos: [],
      familias: null,
      categorias: null,
      procedencias: null,
      ambitos: null,
      tipos: null,
      tratamientos: null,
      composicionTotal: {proteinas: 0, calorias: 0, carbohidratos: 0, grasas: 0}
    };

    $scope.typeahead = {
      ingredientes: [],
      ingredienteSeleccionado: "",
      max: 15,
      getIngredientes: function (value) {
        if(value !== "") {
          ingredientesAPI.getIngredientesPagina({
            page: undefined,
            max: this.max,
            sort: {nombre: 'asc'},
            filter: {nombre: value}
          }).then( function (response) {
            $scope.typeahead.ingredientes = response.data.ingredientes;
          });
          return this.ingredientes;
        }
      },
      addIngrediente: function ($item) {
        checkIfExist($scope.data.receta.ingredientes, 'ingrediente', '_id', $item._id, function (exist) {
          if (exist === true) {
            console.log('[CONTROLADOR] Ya existe el ingrediente ' + $item._id + ' en la receta');
          } else {
            recetasAPI.updateReceta($scope.data.receta._id, {field: 'ingredientes', value: 'add', ref: $item._id}).then(function (response) {
              $scope.data.receta.ingredientes.push({ingrediente: $item, cantidad: 0, _id: response.data});
              this.ingredienteSeleccionado = "";
              console.log('[CONTROLADOR] Añadido ingrediente ' + $item._id + ' a la receta');
              alergenosTotal();
            });
          }
        });
      }
    };

    function cantidadTotal() {
      var res = 0;
      for (var i = $scope.data.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.data.receta.ingredientes[i].cantidad;
      }
      $scope.data.receta.cantidad = res;
    }

    function precioTotal () {
      var res = 0;
      for (var i = $scope.data.receta.ingredientes.length - 1; i >= 0; i--) {
        res = res + $scope.data.receta.ingredientes[i].ingrediente.precio * $scope.data.receta.ingredientes[i].cantidad;
      }
      $scope.data.receta.precio = res;
    }

    function alergenosTotal () {
      var res = [];

      for (var i = $scope.data.receta.ingredientes.length - 1; i >= 0; i--) {
        for (var k = $scope.data.receta.ingredientes[i].ingrediente.alergenos.length - 1; k >= 0; k--) {
          console.log(res.indexOf($scope.data.receta.ingredientes[i].ingrediente.alergenos[k].nombre === -1))
          if (res.indexOf($scope.data.receta.ingredientes[i].ingrediente.alergenos[k].nombre) === -1) {
            console.log($scope.data.receta.ingredientes[i].ingrediente.alergenos[k].nombre)
            res.push($scope.data.receta.ingredientes[i].ingrediente.alergenos[k].nombre);
          } else {
            console.log('no existe')
          }
        }
      }

      $scope.data.receta.alergenos = res;
    }

    function composicionTotal () {
      var totalCalorias = 0, totalProteinas = 0, totalCarbohidratos = 0, totalGrasas = 0;
      for (var i = $scope.data.receta.ingredientes.length - 1; i >= 0; i--) {
        totalCalorias += ($scope.data.receta.ingredientes[i].cantidad*10)*($scope.data.receta.ingredientes[i].ingrediente.calorias);
        totalCarbohidratos += ($scope.data.receta.ingredientes[i].cantidad*10)*($scope.data.receta.ingredientes[i].ingrediente.carbohidratos);
        totalGrasas += ($scope.data.receta.ingredientes[i].cantidad*10)*($scope.data.receta.ingredientes[i].ingrediente.grasas);
        totalProteinas += ($scope.data.receta.ingredientes[i].cantidad*10)*($scope.data.receta.ingredientes[i].ingrediente.proteinas);
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
    
    $scope.objectArrayToString = function (array, prop) {
      return array.map(function (e) {
        return e[prop];
      }).join(separator=', ');
    };

    $scope.updateReceta = function (id, data) {
     console.log(JSON.stringify(data));
     recetasAPI.updateReceta(id, data).then(function (response) {
        $scope.data.receta.ingredientes[data.field] = data.value;
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

    $scope.removeIngrediente = function (ingrediente, $index) {
      recetasAPI.updateReceta($scope.data.receta._id, {field: 'ingredientes', value: 'remove', ref: ingrediente._id}).then(function (response) {
        console.log('array', $scope.data.receta.ingredientes, 'index', $index);
        $scope.data.receta.ingredientes.splice($index, 1);
        $scope.calcularTotal();
      });
    };

    $scope.updateIngrediente = function (ingrediente, $index) {
      var data = {field: 'cantidad', value: ingrediente.cantidad, ref: ingrediente._id};
      recetasAPI.updateReceta($scope.data.receta._id, data).then(function (response) {
        $scope.data.receta.ingredientes[$index][data.field] = data.value;
      });
    };
  });