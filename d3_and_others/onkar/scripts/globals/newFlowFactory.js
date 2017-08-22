/* Use this Template to for the factory portion of writing new MV* flows */
(function () {
    'use strict';
    angular.module('test_app').factory("NewFlowFactory", ['$http', '$q',
          function ($http, $q) {

              var newFlowFactory = {};
               
              newFlowFactory.function = function ( ) {
                  
              }

              return newFlowFactory;

          }]);
})();