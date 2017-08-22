/* Use this Template to for the controller portion of writing new MV* flows */
(function () {

    'use strict';
    angular.module('test_app').
        controller('NewFlowController',
                   function ($scope,
                                $rootScope,
                                $routeParams,
                                $http,
                                $q,
                                $location,
                                $localStorage
                                 , NewFlowFactory 
                             ) {
                     
                       $scope.init = function () {
                           


                       }
                       // Initialize section
                       $scope.init();

                    

                   });



})();
