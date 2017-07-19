(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('RangeStatisticsController',function($scope, $rootScope, Hub ){
        /*$rootScope.allDaysBatchesData
        \<tr ng-repeat="batchDataElement in allDaysBatchesData.daysData track by $index">
    <th>{{batchDataElement.initialDate}}</th>
    <th>{{batchDataElement.endDate}}</th>
    <th>{{batchDataElement.totalRevenue}}</th>
    <th>{{batchDataElement.totalQuantity}}</th>
    <th>{{batchDataElement.totalProfit}}</th>
 </tr>
        */
        $scope.rangeOptions = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                duration: 500,
                xAxis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };
         $scope.statsOptions = {
            chart: {
                type: 'multiChart',
                height: 450,
                margin : {
                    top: 30,
                    right: 60,
                    bottom: 50,
                    left: 70
                },
                color: d3.scale.category10().range(),
                //useInteractiveGuideline: true,
                duration: 500,
                xAxis: {
                    tickFormat: function(d){
                        return d3.format(',f')(d);
                    }
                },
                yAxis1: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                },
                yAxis2: {
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };
  function generateRangeData(){
      /*
       average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
10. meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
11. variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
12. standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
      */let batchData = [];
            if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData){
                
                let i = 0;
                let revenuesPlot = {};
                revenuesPlot.type="bar";
                revenuesPlot.key="Revenues x 10";
                revenuesPlot.values = [];
                revenuesPlot.yAxis=1;
               
                let revenuesAveragePlot = {};
                revenuesAveragePlot.type="line";
                revenuesAveragePlot.key="Revenue Averagex10";
                revenuesAveragePlot.values = [];
                revenuesAveragePlot.yAxis=1;
                
                let revenuesVariancePlot = {};
                revenuesVariancePlot.type="line";
                revenuesVariancePlot.key="Revenue Variance";
                revenuesVariancePlot.values = [];
                revenuesVariancePlot.yAxis=1;
             
                let revenuesMeanDevPlot = {};
                revenuesMeanDevPlot.type="line";
                revenuesMeanDevPlot.key="Revenue mean deviation";
                revenuesMeanDevPlot.values = [];
                revenuesMeanDevPlot.yAxis=2;
                
                let revenuesStdDevPlot = {};
                revenuesStdDevPlot.type="line";
                revenuesStdDevPlot.key="Revenue std deviation";
                revenuesStdDevPlot.values = [];
                revenuesStdDevPlot.yAxis=2;
             
                let quantitiesPlot = {};
                quantitiesPlot.type="bar";
                quantitiesPlot.key="Quantities";
                quantitiesPlot.values = [];
                quantitiesPlot.yAxis=1;
               
                let quantitiesAveragePlot = {};
                quantitiesAveragePlot.type="line";
                quantitiesAveragePlot.key="Quantity Averages";
                quantitiesAveragePlot.values = [];
                quantitiesAveragePlot.yAxis=1;
               
                let profitsPlot = {};
                profitsPlot.type="bar";
                profitsPlot.key="Profits";
                profitsPlot.values = [];
                profitsPlot.yAxis=1;
               
                 let profitsAveragePlot = {};
                profitsAveragePlot.type="line";
                profitsAveragePlot.key="Profits";
                profitsAveragePlot.values = [];
                profitsAveragePlot.yAxis=1;
               
                let revenueValues = [];
                for(; i < $rootScope.allDaysBatchesData.daysData.length;i++){
                    revenuesPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].totalRevenue/10.00,2) });
                    revenueValues.push($rootScope.allDaysBatchesData.daysData[i].totalRevenue);
                    quantitiesPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalQuantity});
                    profitsPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalProfit});
                    revenuesAveragePlot.values.push({x:i, y:  decimalRound($rootScope.allDaysBatchesData.daysData[i].revenueAverage/10.00,2)});
                    quantitiesAveragePlot.values.push({x:i, y:  $rootScope.allDaysBatchesData.daysData[i].quantityAverage  });
                    profitsAveragePlot.values.push({x:i, y:   $rootScope.allDaysBatchesData.daysData[i].profitAverage  });
                }
                /*
                let revenuesAverage = decimalRound(average(revenueValues, 2, true )/10.00,2);
                let revenuesVariance = variance(revenueValues, 2, true );
                let revenuesMeanDev = meanDeviation(revenueValues, 2, true );
                let revenuesStdDev = standardDeviation(revenueValues, 2, true );
                 let $scope.revenuesAverage = revenuesAverage;
                let $scope.revenuesVariance = revenuesVariance;
                let $scope.revenuesMeanDev = revenuesMeanDev;
                let $scope.revenuesStdDev = revenuesStdDev;
                for(let j = 0; j < $rootScope.allDaysBatchesData.daysData.length;j++){
                     revenuesAveragePlot.values.push({x:j, y: revenuesAverage});
                 revenuesVariancePlot.values.push({x:j, y: revenuesVariance});
                 revenuesMeanDevPlot.values.push({x:j, y: revenuesMeanDev});
                 revenuesStdDevPlot.values.push({x:j, y: revenuesStdDev});
                }
                */
                batchData.push(revenuesPlot);
                batchData.push(revenuesAveragePlot);
               //    batchData.push(revenuesVariancePlot);
               //    batchData.push(revenuesMeanDevPlot);
               //    batchData.push(revenuesStdDevPlot);
                
                batchData.push(quantitiesPlot);
                 batchData.push(quantitiesAveragePlot);
               batchData.push(profitsPlot);
               batchData.push(profitsAveragePlot);
                
                
                 return batchData ;
            }
            
        }

   function generateStatsData() {
       
   }

        $scope.init = function(){
           if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData)
               console.log($rootScope.allDaysBatchesData.daysData.length);
            else
                console.log('Gotchhi') ;
            $scope.rangeData = generateRangeData();
        
        }
        $scope.init();
    })
})();