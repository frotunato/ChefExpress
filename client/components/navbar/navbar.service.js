angular.module('chefExpressApp')
  
  .factory('Navbar', function () {
    return {
      header: {
        options: {
          data: [{text: 'Ingredientes', link: '#/ingredientes'}, {text: 'Recetas', link: '#/recetas'}]
        }
      },
      body: {
        title: '',
        options: {
          data: [{text: 'Nuevo ingrediente', action: ''}, {text: 'Nueva categoría'}]
        }
      },
      user: {

      },
    };
  });