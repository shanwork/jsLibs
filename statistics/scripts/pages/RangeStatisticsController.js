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
  function generateData(){
      /*
       average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
10. meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
11. variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
12. standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
      */
            if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData){
                let batchData = [];
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
               
                let profitsPlot = {};
                profitsPlot.type="bar";
                profitsPlot.key="Profits";
                profitsPlot.values = [];
                profitsPlot.yAxis=1;
               
                let revenueValues = [];
                for(; i < $rootScope.allDaysBatchesData.daysData.length;i++){
                    revenuesPlot.values.push({x:i, y: decimalRound($rootScope.allDaysBatchesData.daysData[i].totalRevenue/10.00,2) });
                    revenueValues.push($rootScope.allDaysBatchesData.daysData[i].totalRevenue);
                    quantitiesPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalQuantity});
                    profitsPlot.values.push({x:i, y: $rootScope.allDaysBatchesData.daysData[i].totalProfit});
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
               // batchData.push(revenuesAveragePlot);
               //    batchData.push(revenuesVariancePlot);
               //    batchData.push(revenuesMeanDevPlot);
               //    batchData.push(revenuesStdDevPlot);
                
                batchData.push(quantitiesPlot);
                batchData.push(profitsPlot);
                
                
                 return batchData ;
            }
            var testdata = stream_layers(7,10+Math.random()*100,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data.map(function(a){a.y = a.y * (i <= 1 ? -1 : 1); return a})
                };
            });

            testdata[0].type = "area"
            testdata[0].yAxis = 1
            testdata[1].type = "area"
            testdata[1].yAxis = 1
            testdata[2].type = "line"
            testdata[2].yAxis = 1
            testdata[3].type = "line"
            testdata[3].yAxis = 2
            testdata[4].type = "bar"
            testdata[4].yAxis = 2
            testdata[5].type = "bar"
            testdata[5].yAxis = 2
            testdata[6].type = "bar"
            testdata[6].yAxis = 2

            return testdata;
        }

        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }
        $scope.init = function(){
           if ($rootScope.allDaysBatchesData && $rootScope.allDaysBatchesData.daysData)
               console.log($rootScope.allDaysBatchesData.daysData.length);
            else
                console.log('Gotchhi') ;
            $scope.rangeData = generateData();
        
        }
        $scope.init();
    })
})();