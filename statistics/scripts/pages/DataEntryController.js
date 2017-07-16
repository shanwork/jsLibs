(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('DataEntryController',function($scope, $rootScope, Hub ){
        
        $scope.init = function () {
            $scope.dataGenerated=false ;
            $scope.showReadme=false;
            $scope.todaysDate = new Date().toDateString();
            $scope.sameDayCloneNumber = 15;
            $scope.daysToRepeatNumber = 30;
            $scope.initialUnits = 3;
            $scope.maxUnits = 200;
            $scope.minUnits = 14;
            $scope.initDate =  new Date('2017-07-04').toDateString();
            $scope.seedObject = { 
                'menuItem': 'margarita pizza', 
                'size': 'personal', 
                'quantitySold': $scope.initialUnits  , 
                'unitCost': '7.99', 
                'date': "'" + $scope.initDate + "'", 
                'postTaxProfit':'1.25' 
            };
            $scope.seedObjectString = JSON.stringify($scope.seedObject);
            $scope.allDaysData = { 
                initialDate : $scope.initDate // everything else is initialized in the Hub.initializeDayData function
            };
        }
        
        $scope.init();
        
        $scope.generateTestData = function () {
            if (!$rootScope.allDaysBatchesData) {
                $rootScope.allDaysBatchesData = {
                    startDate: $scope.allDaysData.initialDate,
                    endDate: null,
                    daysData:[]
                    
                }
            }
            $scope.dataGenerated=false ;
            if ($scope.allDaysData.endDate)
                $scope.allDaysData.initialDate = $scope.allDaysData.endDate;
            Hub.generateTestData($scope.allDaysData,$scope.seedObject, $scope.daysToRepeatNumber, $scope.sameDayCloneNumber);
            $rootScope.allDaysBatchesData.endDate = $scope.allDaysData.endDate
            var daysRangeData = {};
            deepCopy($scope.allDaysData, daysRangeData);
            $rootScope.allDaysBatchesData.daysData.push(daysRangeData);
            
            $scope.dataGenerated=true ;         
        }
        $scope.dayRangeOptions = {
        chart: {
            type: 'lineChart',
            height: 350,
            width: 800,
            margin: {
                top: 5,
                right: 20,
                bottom: 20,
                left: 15
            },
            x: function (d) { return d.x; },
            y: function (d) { return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function (e) { console.log("stateChange"); },
                changeState: function (e) { console.log("changeState"); },
                tooltipShow: function (e) { console.log("tooltipShow"); },
                tooltipHide: function (e) { console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Days'
            },
            yAxis: {
                axisLabel: 'variable',
                
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: false,
            text: 'Demo showing NVD3 Angular with Interval for animation'
        },
        subtitle: {
            enable: false,
            text: 'Using the $interval directive calling back the chart data generation, drawing a snapshot of three plots and the average',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: false,
            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
    };
        $scope.dailyOrderOptions = {
        chart: {
            type: 'lineChart',
            height: 250,
            width: 500,
            margin: {
                top: 5,
                right: 20,
                bottom: 40,
                left: 15
            },
            x: function (d) { return d.x; },
            y: function (d) { return d.y; },
            useInteractiveGuideline: true,
            dispatch: {
                stateChange: function (e) { console.log("stateChange"); },
                changeState: function (e) { console.log("changeState"); },
                tooltipShow: function (e) { console.log("tooltipShow"); },
                tooltipHide: function (e) { console.log("tooltipHide"); }
            },
            xAxis: {
                axisLabel: 'Days'
            },
            yAxis: {
                axisLabel: 'variable',
                
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: false,
            text: 'Demo showing NVD3 Angular with Interval for animation'
        },
        subtitle: {
            enable: false,
            text: 'Using the $interval directive calling back the chart data generation, drawing a snapshot of three plots and the average',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: false,
            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
    };
    })
})();