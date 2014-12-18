angular.module('chefExpressApp')

  .factory('Utils', function () {
    return {
      depthIndexOf: function depthIndexOf (array, field, value) {
        var res = -1;
        for (var i = array.length - 1; i >= 0; i--) {
          if (array[i][field] === value) {
            res = i;
            break;
          }
        }
        return res;
      }
    };
  });