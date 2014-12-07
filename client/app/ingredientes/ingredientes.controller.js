angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $modal, Navbar, initialData, ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI) {
    Navbar.area = 'Ingredientes';

    $scope.data = {
      ingredientes: initialData.ingredientes.data,
      totalIngredientes: initialData.ingredientes.total,
      familias: initialData.familias,
      alergenos: initialData.alergenos,
      intolerancias: initialData.intolerancias
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
        },
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
        page: 1,
        max: 25,
        getResultsPage: function (newPage) {
          ingredientesAPI.getIngredientesPagina({
            page: newPage - 1, 
            max: this.max, 
            sort: $scope.table.sorting.value,
            filter: $scope.table.filtering.value
          }).then(function (response) {
            $scope.data.ingredientes = response.data.ingredientes;
            $scope.data.totalIngredientes = response.data.total;
            this.page = newPage - 1;
          });
        }
      }
    };
    
    $scope.crudIngrediente = {
      update: function (id, data) {
        var keyName = Object.keys(data)[0];
        if (Array.isArray(data[keyName])) {
          var arrayId = data[keyName].map(function (value) {
            return value._id;
          });
          data[keyName] = arrayId;
        }

        ingredientesAPI.updateIngrediente(id, data).then(function (response) {
          console.log('[CONTROLADOR_INGREDIENTES] updateIngrediente: ' + JSON.stringify(data), id);
        });
      } 
    };

    $scope.getAlergenos = function () {
      alergenosIngredienteAPI.getAlergenos().then(function (response) {
        $scope.ingredientes.alergenos = response.data;
      });
    };

    $scope.getFamilias = function () {
      familiasIngredienteAPI.getFamilias().then(function (response) {
        $scope.ingredientes.familias = response.data;
      });
    };

    //debe ser filtro
    $scope.objectArrayToString = function (array, prop) {
      return array.map(function (e) {
        return e[prop];
      }).join(separator=', ');
    };
    
    var nuevoIngredienteModal = {};
    
    $scope.modal = {
      show: function () {
        nuevoIngredienteModal = $modal({scope: $scope, template: 'app/ingredientes/nuevoIngrediente', show: false});
        nuevoIngredienteModal.$promise.then(nuevoIngredienteModal.show);
      },
      hide: function () {
        nuevoIngredienteModal.$promise.then(nuevoIngredienteModal.destroy);
      },
      submit: function (data) {  
        if (data.hasOwnProperty('familia') && data.hasOwnProperty('alergenos')) {
          delete(data.familia.nombre);
        }
        ingredientesAPI.addIngrediente(data).then(function (response) {
          $scope.table.pagination.getResultsPage($scope.table.pagination.page);
        });
        this.hide();
        }
    };
  
  });