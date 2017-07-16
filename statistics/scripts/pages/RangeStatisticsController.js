(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('RangeStatisticsController',function($scope, $rootScope, Hub ){
        $scope.init = function(){
           if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData)
               console.log($rootScope.allDaysBatchesData.daysData.length);
            else
                console.log('Gotchhi') ;
        }
        $scope.init();
    })
})();