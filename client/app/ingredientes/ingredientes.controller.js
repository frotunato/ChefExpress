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
    
    $scope.ingredientesAPI = {
      update: function (operation, wrapper) {
        //permitir update multiple
        /*[ {op: update, collection: []}
        {op: update, _id: aa22, value: {nombre: k}},
        {op: update, _id: aa33, value: {familia: {_id: aa2}}}
        ]
        
        */
        ingredientesAPI.update({op: operation, wrapper: wrapper}).then(function (response) {
          console.log(response.data);
        });
        // {op: remove, path: item[field], value: item[value]}
        // ingredientesAPI.update(item)
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
        ]).then(function (response) {
          console.log(response);
          if (angular.isDefined(response[0])) {
            //solo borrar lo que viene de base de datos, nunca confiar local
            $scope.editarPropiedadIngredientes.refreshView(response[0].data, 'update');
            //console.log(response[0].data);
          } 
          if (angular.isDefined(response[1])) {
            //comprobar si lo borrado coincide con base de datos
            $scope.editarPropiedadIngredientes.refreshView(response[1].data, 'remove');
          }
          if (angular.isDefined(response[2])) {
            $scope.editarPropiedadIngredientes.refreshView(response[2].data, 'create');
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
          var index = - 1;
          /* Comprobar si la modificacion tiene _id o no y si es virtual
             de esta manera modificamos de forma local sin tener una _id
             asignada por el servidor. Los cambios no se reflejan en el
             array de updates, si no en creates.
          */
          if (item._id && item.isVirtual) {
            index = Utils.depthIndexOf($scope.editarPropiedadIngredientes.create.items, '_id', item._id);
            $scope.editarPropiedadIngredientes.create.items[index] = item;
          } else if (Utils.depthIndexOf(this.items, '_id', item._id) === -1) {
            this.items.push(item);
          }
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
        }
      },
      create: {
        items: [],
        add: function (item) {
          /* como el _id del item se genera en el lado del servidor
             si modificamos una propiedad creada virtualmente aun
             no tenemos el _id, por lo que hay que generar uno
          */
          var selectedProperty = $scope.selectedProperty;
          item._id = Math.random().toString(36).slice(2);
          item.isVirtual = true;
          if (Utils.depthIndexOf(this.items, '_id', item._id) === -1) {
            this.items.push(item);
            $scope.clonedData[selectedProperty].push(item);
          }
        },
        get: function () {
          return angular.toJson(this.items);
        },
        execute: function () {
          var res;
          if (this.items.length > 0) {
            //* remove custom index /*
            for (var i = 0; i < this.items.length; i++) {
              if (this.items[i]._id) {
                this.items[i]._id = undefined;
                this.items[i].isVirtual = undefined;
              }
            }
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
          return angular.toJson(this.items);
        },
        execute: function () {
          console.log(this.get());
          var res;
          if (this.items.length > 0) {
            res = $scope.editarPropiedadIngredientes.selectedFactory().remove(this.get());
          }
          return res;
        }
      },
      refreshView: function (items, action) {
        var selectedProperty = $scope.selectedProperty;
        var valuesToReplace = items;
        var actualValue = null;
        //por si el nombre de la coleccion difiere con la propiedad 
        var mod = (selectedProperty === 'familias') ? 'familia' : selectedProperty; 
        console.log(items, action);
        if (action === 'create') {
          // for al reves para maximo rendimiento, push siempre al final
          // tratamiento de elementos virtuales, asignando _ids del servidor

          for (var h = valuesToReplace.length - 1; h >= 0; h--) {
            var index = Utils.depthIndexOf($scope.clonedData[selectedProperty], '_id', undefined);
            $scope.clonedData[selectedProperty].splice(index, 1);
          }
          $scope.clonedData[selectedProperty] = $scope.clonedData[selectedProperty].concat(valuesToReplace);
          
        } else if (action === 'remove' || action === 'update') {
          for (var t = 0; t < $scope.clonedData.ingredientes.length; t++) {
            actualValue = $scope.clonedData.ingredientes[t][mod];
            for (var q = 0; q < valuesToReplace.length; q++) {
              if (actualValue !== null && actualValue._id === valuesToReplace[q]) {
                actualValue = (action === 'remove') ? null : $scope.clonedData.ingredientes[t];
                break;
              }
            }
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