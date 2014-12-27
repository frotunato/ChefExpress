angular.module('chefExpressApp.ingredientes')
	
	.controller('ingredientesMainCtrl', function ($scope, $rootScope, $timeout, $injector, $q, $modal, Navbar, initialData, ingredientesAPI, alergenosIngredienteAPI, familiasIngredienteAPI, Utils) {

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

    $scope.selectedProperty = '';
    $scope.selectedItems = [];

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
          ingredientesAPI.getPage({
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
        //ARREGLAR CHAPUZA
        if (Array.isArray(data[keyName])) {
          var arrayId = data[keyName].map(function (value) {
            return value._id;
          });
          data[keyName] = arrayId;
        }

        ingredientesAPI.update(id, data).then(function (response) {
          console.log('[CONTROLADOR_INGREDIENTES] updateIngrediente: ' + JSON.stringify(data), id);
        });
      } 
    };

    $scope.getAlergenos = function () {
      alergenosIngredienteAPI.getAll().then(function (response) {
        $scope.data.alergenos = response.data;
      });
    };

    $scope.getFamilias = function () {
      familiasIngredienteAPI.getAll().then(function (response) {
        $scope.data.familias = response.data;
      });
    };

    $scope.getIntolerancias = function () {
      intoleranciasIngredienteAPI.getAll().then(function (response) {
        $scope.data.intolerancias = response.data;
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
        ingredientesAPI.create(data).then(function (response) {
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
        //$scope.selectedItems = [];
      },
      submit: function (data) {
        var ids = data.map(function (element) {
          return element._id;
        });    
        ingredientesAPI.remove(ids).then(function (response) {
          $scope.table.pagination.refresh();
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
       
        $q.all([
          this.update.execute(),
          this.remove.execute(),
          this.create.execute()
        ]).then(function (data) {
          console.log(data);
          if (data[0]) {
            $scope.editarPropiedadIngredientes.update.refreshView(JSON.parse(data[0].config.data));
          } 
          if (data[1]) {
            //$scope.editarPropiedadIngredientes.remove.refreshView();
          }
        
          $scope.data = $scope.clonedData;
          //$scope.table.pagination.refresh();          
          $scope.editarPropiedadIngredientes.reset();
          $scope.editarPropiedadIngredientes.hide();
        });
      },
      selectedFactory: function () {
        return $injector.get($scope.selectedProperty + 'IngredienteAPI');
      },
      update: {
        items: [],
        add: function (item) {
          this.items.push(item);
        },
        get: function () {
          return angular.toJson(this.items);
        },
        execute: function () {
          var res;
          if (this.items.length > 0) {
            res = $scope.editarPropiedadIngredientes.selectedFactory().partialUpdate(this.get());            
          }
          return res;
        },
        refreshView: function (items) {
          var selectedProperty = $scope.selectedProperty;
          var valuesToReplace = this.items;
          var mod = selectedProperty;

          if (selectedProperty === 'familias') mod = 'familia';

          for (var i = 0; i < $scope.clonedData.ingredientes.length; i++) {
            for (var k = 0; k < valuesToReplace.length; k++) {
              if ($scope.clonedData.ingredientes[i][mod]._id === valuesToReplace[k]._id) {
                $scope.clonedData.ingredientes[i][mod] = valuesToReplace[k];
                break;
              }
            }
          }
        }
      },
      create: {
        items: [],
        add: function (item) {
          var selectedProperty = $scope.selectedProperty;
          $scope.clonedData[selectedProperty].push(item);
          this.items.push(item);
        },
        get: function () {
          return angular.toJson(this.items);
        },
        execute: function () {
          var res;
          if (this.items.length > 0) {
            res = $scope.editarPropiedadIngredientes.selectedFactory().create(this.get());
          }
          return res;
        }
      },
      remove: {
        items: [],
        add: function (item) {
          var selectedProperty = $scope.selectedProperty;
          var index = Utils.depthIndexOf($scope.clonedData[selectedProperty], '_id', item._id);
          $scope.clonedData[selectedProperty].splice(index, 1);
          this.items.push(item);
        },
        get: function () {
          var _ids = this.items.map(function (element) {
            return element._id;
          });
          return _ids;
        },
        execute: function () {
          console.log(this.get());
          var res;
          if (this.items.length > 0) {
            res = $scope.editarPropiedadIngredientes.selectedFactory().remove(this.get());
          }
          return res;
        },
        refreshView: function () {
          var selectedProperty = $scope.selectedProperty;
          var items = this.get();
          var index;
          for (var i = 0; i < items.length; i++) {
            index = Utils.depthIndexOf($scope.clonedData[selectedProperty], '_id', items[i]);
            console.log(index, this.get(),$scope.clonedData[selectedProperty][index]);
            $scope.clonedData[selectedProperty].splice(index, 1);
          }
        }
      },
      reset: function () {
        this.update.items = [];
        this.create.items = [];
        this.remove.items = [];
      }
    };
  });