angular.module('chefExpressApp')
  
  .factory('Navbar', function () {
    return {
      isHeaderVisible: false,
      actions: [],
      user:{},
      area: ''
    };
  });