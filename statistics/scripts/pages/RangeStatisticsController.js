(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('RangeStatisticsController',function($scope, $rootScope, Hub ){
        
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
      */
    let batchData = [];
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
                profitsAveragePlot.key="Profit Average";
                profitsAveragePlot.values = [];
                profitsAveragePlot.yAxis=1;
                profitsAveragePlot.classed = "dotted";
                let revenueValues = [];
                let quantityValues = [];
                let profitValues = [];
                for(; i < $rootScope.allDaysBatchesData.daysData.length;i++){
                    revenuesPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].totalRevenue/10.00,2) });
                    revenueValues.push($rootScope.allDaysBatchesData.daysData[i].totalRevenue);
                    quantitiesPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalQuantity});
                    quantityValues.push( $rootScope.allDaysBatchesData.daysData[i].totalQuantity );
                    profitsPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalProfit});
                    profitValues.push( $rootScope.allDaysBatchesData.daysData[i].totalProfit );
                }
                let batchRevenuesAverage = decimalRound(average(revenueValues, 2, true )/10.00,2);
                let batchQuantityAverage =  average(quantityValues, 2, true );
                let batchProfitAverage =  average(profitValues, 2, true);
                for(let k = 0; k< $rootScope.allDaysBatchesData.daysData.length;k++){
                    revenuesAveragePlot.values.push({x:k, y:  decimalRound(batchRevenuesAverage,2)});
                    quantitiesAveragePlot.values.push({x:k, y: decimalRound(batchQuantityAverage,2)  });
                    profitsAveragePlot.values.push({x:k, y: decimalRound(batchProfitAverage,2)  });
                }
                $scope.batchRevenuesAverage = batchRevenuesAverage;
                $scope.batchQuantityAverage = batchQuantityAverage;
                $scope.batchProfitAverage = batchProfitAverage;
                 
                
                $scope.batchRevenuesVariance = variance(revenueValues, 2, true );
                $scope.batchQuantityVariance = variance(quantityValues, 2, true );
                $scope.batchProfitVariance = variance(profitValues, 2, true );
                
                $scope.batchRevenuesMeanDev = meanDeviation(revenueValues, 2, true );
                $scope.batchQuantityMeanDev = meanDeviation(quantityValues, 2, true );
                $scope.batchProfitMeanDev = meanDeviation(profitValues, 2, true );
                
                $scope.batchRevenuesStdDev = standardDeviation(revenueValues, 2, true );
                $scope.batchQuantityStdDev = standardDeviation(quantityValues, 2, true );
                $scope.batchProfitStdDev = standardDeviation(profitValues, 2, true );
                
               
                batchData.push(revenuesPlot);
                batchData.push(revenuesAveragePlot);
                batchData.push(quantitiesPlot);
                batchData.push(quantitiesAveragePlot);
                batchData.push(profitsPlot);
                batchData.push(profitsAveragePlot);
                
                
                 return batchData ;
            }
            
        }

  function generateRangeAndStatsData(){
      
      let batchData = [];
      let rangeData = [];
      
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
               
                let quantitiesVariancePlot = {};
                quantitiesVariancePlot.type="line";
                quantitiesVariancePlot.key="Quantity Variance";
                quantitiesVariancePlot.values = [];
                quantitiesVariancePlot.yAxis=1;
             
                let quantitiesMeanDevPlot = {};
                quantitiesMeanDevPlot.type="line";
                quantitiesMeanDevPlot.key="quantities mean deviation";
                quantitiesMeanDevPlot.values = [];
                quantitiesMeanDevPlot.yAxis=2;
                
                let quantitiesStdDevPlot = {};
                quantitiesStdDevPlot.type="line";
                quantitiesStdDevPlot.key="quantities std deviation";
                quantitiesStdDevPlot.values = [];
                quantitiesStdDevPlot.yAxis=2;
          
                let profitsPlot = {};
                profitsPlot.type="bar";
                profitsPlot.key="Profits";
                profitsPlot.values = [];
                profitsPlot.yAxis=1;
               
                let profitsAveragePlot = {};
                profitsAveragePlot.type="line";
                profitsAveragePlot.key="Profit Average";
                profitsAveragePlot.values = [];
                profitsAveragePlot.yAxis=1;
                profitsAveragePlot.classed = "dotted";
          
                let profitsVariancePlot = {};
                profitsVariancePlot.type="line";
                profitsVariancePlot.key="profits Variance";
                profitsVariancePlot.values = [];
                profitsVariancePlot.yAxis=1;
             
                let profitsMeanDevPlot = {};
                profitsMeanDevPlot.type="line";
                profitsMeanDevPlot.key="profits mean deviation";
                profitsMeanDevPlot.values = [];
                profitsMeanDevPlot.yAxis=2;
                
                let profitsStdDevPlot = {};
                profitsStdDevPlot.type="line";
                profitsStdDevPlot.key="profits std deviation";
                profitsStdDevPlot.values = [];
                profitsStdDevPlot.yAxis=2;
          
                let revenueValues = [];
                let quantityValues = [];
                let profitValues = [];
                for(; i < $rootScope.allDaysBatchesData.daysData.length;i++){
                    revenuesPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].totalRevenue/10.00,2) });
                    revenuesVariancePlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].revenuesVariance ,2) });
                    revenuesMeanDevPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].revenuesMeanDev,2) });
                    revenuesStdDevPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].revenuesStdDev,2) });
                    
                    revenueValues.push($rootScope.allDaysBatchesData.daysData[i].totalRevenue);
                    quantitiesPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalQuantity});
                    quantitiesVariancePlot.values.push({x:i, y:     
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].quantityVariance ,2) });
                    quantitiesMeanDevPlot.values.push({x:i, y: 
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].quantityMeanDev,2) });
                    quantitiesStdDevPlot.values.push({x:i, y: 
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].quantityStdDev,2) });
                    
                    quantityValues.push( $rootScope.allDaysBatchesData.daysData[i].totalQuantity );
                    profitsPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalProfit});
                    profitsVariancePlot.values.push({x:i, y:     
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].profitVariance ,2) });
                    profitsMeanDevPlot.values.push({x:i, y: 
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].profitMeanDev,2) });
                    profitsStdDevPlot.values.push({x:i, y: 
                                decimalRound($rootScope.allDaysBatchesData.daysData[i].profitStdDev,2) });
                   
                    profitValues.push( $rootScope.allDaysBatchesData.daysData[i].totalProfit );
                }
                let batchRevenuesAverage = decimalRound(average(revenueValues, 2, true )/10.00,2);
                let batchQuantityAverage =  average(quantityValues, 2, true );
                let batchProfitAverage =  average(profitValues, 2, true);
                for(let k = 0; k< $rootScope.allDaysBatchesData.daysData.length;k++){
                    revenuesAveragePlot.values.push({x:k, y:  decimalRound(batchRevenuesAverage,2)});
                    quantitiesAveragePlot.values.push({x:k, y: decimalRound(batchQuantityAverage,2)  });
                    profitsAveragePlot.values.push({x:k, y: decimalRound(batchProfitAverage,2)  });
                }
                $scope.batchRevenuesAverage = batchRevenuesAverage;
                $scope.batchQuantityAverage = batchQuantityAverage;
                $scope.batchProfitAverage = batchProfitAverage;
                 
                
                $scope.batchRevenuesVariance = variance(revenueValues, 2, true );
                $scope.batchQuantityVariance = variance(quantityValues, 2, true );
                $scope.batchProfitVariance = variance(profitValues, 2, true );
                
                $scope.batchRevenuesMeanDev = meanDeviation(revenueValues, 2, true );
                $scope.batchQuantityMeanDev = meanDeviation(quantityValues, 2, true );
                $scope.batchProfitMeanDev = meanDeviation(profitValues, 2, true );
                
                $scope.batchRevenuesStdDev = standardDeviation(revenueValues, 2, true );
                $scope.batchQuantityStdDev = standardDeviation(quantityValues, 2, true );
                $scope.batchProfitStdDev = standardDeviation(profitValues, 2, true );
                
              
                batchData.push(revenuesPlot);
                batchData.push(revenuesAveragePlot);
          
            rangeData.push(revenuesVariancePlot);
          rangeData.push(revenuesMeanDevPlot);
          rangeData.push(revenuesStdDevPlot);
                
                batchData.push(quantitiesPlot);
                  rangeData.push(quantitiesVariancePlot);
          rangeData.push(quantitiesMeanDevPlot);
          rangeData.push(quantitiesStdDevPlot);
          
                batchData.push(quantitiesAveragePlot);
               batchData.push(profitsPlot);
            rangeData.push(profitsVariancePlot);
          rangeData.push(profitsMeanDevPlot);
          rangeData.push(profitsStdDevPlot);
               batchData.push(profitsAveragePlot);
                
            let chartData = [];
            chartData.push(batchData);
            chartData.push(rangeData);
          return chartData; //batchData ;
      }
  }

   function generateStatsData() {
       
   }

        $scope.init = function(){
           if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData)
               console.log($rootScope.allDaysBatchesData.daysData.length);
            else
                console.log('Gotchhi') ;
            var chartData = generateRangeAndStatsData();
            $scope.rangeData = chartData[0];
        $scope.statsData = chartData[1];
        
        }
        $scope.init();
    })
})();