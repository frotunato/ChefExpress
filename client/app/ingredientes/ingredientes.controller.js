angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $rootScope, $modal, Navbar, initialData, ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI, Utils) {

    (function updateNavbar(navbar) {
      Navbar.header = {
        title: {
          text: 'Ingredientes',
          action: '#/inicio'
        },
        options: {
          triggers: ['click'],
          data: [{text: 'Recetas', action: '#/ingredientes'}]
        }
      };

      Navbar.body = {
        title: '',
        options: {
          data: [
            {text: 'Nuevo', action: function () { return $scope.modal.show(); }}, 
            {text: 'Borrar', action: function () { return $scope.borrarIngredientesModal.show(); }},
            {text: 'Rehacer', action: function () { return $scope.modal.show(); }} 
          ]}
      };
      
      $rootScope.$broadcast("NavbarChange");
    })(Navbar);

    $scope.selectedItems = [];
    $scope.selectedProperty = '';

    $scope.data = {
      ingredientes: initialData.ingredientes.data,
      totalIngredientes: initialData.ingredientes.total,
      familias: initialData.familias,
      alergenos: initialData.alergenos,
      intolerancias: initialData.intolerancias
    };
    
    $scope.clonedData = angular.copy($scope.data);

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
        },
        refresh: function () {
          this.getResultsPage(this.page);
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
  
    var borrarIngredientesModal = {};
    
    $scope.borrarIngredientesModal = {
      show: function () {
        borrarIngredientesModal = $modal({scope: $scope, template: 'app/ingredientes/borrarIngredientes', show: false});
        borrarIngredientesModal.$promise.then(borrarIngredientesModal.show);
      },
      hide: function () {
        borrarIngredientesModal.$promise.then(borrarIngredientesModal.destroy);
        $scope.selectedItems = [];
      },
      submit: function (data) {
        var ids = data.map(function (element) {
          return element._id;
        });    
        ingredientesAPI.removeIngredientes(ids).then(function (response) {
          $scope.table.pagination.getResultsPage($scope.table.pagination.page);
        });
        this.hide();
      } 
    };
    
    var editarPropiedadIngredientesModal = {};
    
    $scope.editarPropiedadIngredientes = {
      show: function () {
        $scope.clonedData = angular.copy($scope.data);
        editarPropiedadIngredientesModal = $modal({scope: $scope, template: 'app/ingredientes/editarPropiedadIngredientes', show: false, backdrop: 'static'});
        editarPropiedadIngredientesModal.$promise.then(editarPropiedadIngredientesModal.show);
      },
      hide: function () {
        editarPropiedadIngredientesModal.$promise.then(editarPropiedadIngredientesModal.destroy);
        $scope.selectedProperty = '';
      },
      submit: function () {
        familiasIngredienteAPI.partialUpdate(this.getChanges()).then(function (response) {
          console.log(response);
          $scope.data = $scope.clonedData;
          console.log($scope.data, $scope.clonedData)
          $scope.table.pagination.refresh();          
          //$scope.data = $scope.;
        });
        this.hide();

      },
      changedItems: [],
      pushChange: function (item) {
        var index = Utils.depthIndexOf(this.changedItems, '_id', item._id);
        if (index !== -1) {
          this.changedItems[index] = item;        
        } else {
          this.changedItems.push(item);
        }
      },
      getChanges: function () {
        console.log(this.changedItems);
        return angular.toJson(this.changedItems);
      }
    };
  });