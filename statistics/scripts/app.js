var test_stats_app = angular.module('test_stats_app', ['nvd3']);

test_stats_app.controller('StatisticalControl', function ($scope, $interval) {
    $scope.init = function () {
        $scope.sameDayCloneNumber = 10;
        $scope.daysToRepeatNumber = 2;
        $scope.initialUnits = 125;
        $scope.maxUnits = 200;
        $scope.minUnits = 2;
        $scope.initDate =  new Date('2017-07-05')
        $scope.seedObject = { 'menuItem': 'margarita pizza', 'size': 'personal', 'sale': $scope.initialUnits + " units", 'unitCost': '7.99', 'date': "'" + $scope.initDate + "'" };
        $scope.seedObjectString = JSON.stringify($scope.seedObject);
        $scope.allDaysData = [];
    }
    $scope.init();
    $scope.generateTestData = function () {
        let visitedNumbers = [];
        $scope.todaysOrders = [];
        $scope.seedObject.totalCost = decimalRound($scope.initialUnits * parseFloat($scope.seedObject.unitCost),2);
        $scope.todaysOrders.push($scope.seedObject);
       
        for (let index = 1; index < $scope.sameDayCloneNumber; index++)
        {
           
                let jsonIndex = parseInt(Math.random() * (refMenuItems.length - 1));
             
            let modifyList = [
                 {
                     key: 'menuItem',
                     operation: 'explicitReplace',
                     searchString: 'na',
                     operand: refMenuItems[jsonIndex].menuItem
                 },
            {
                key: 'size',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: refMenuItems[jsonIndex].size
            },
            {
                key: 'sale',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: parseInt(Math.random() * 200) + ' units'
            },
            {
                key: 'unitCost',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: refMenuItems[jsonIndex].unitCost
            }
            ];
            let testCopy = {};
            deepCopy($scope.seedObject, testCopy, modifyList);
            testCopy.totalCost = decimalRound(parseFloat(testCopy.sale.replace(' units', '')) * parseFloat(testCopy.unitCost), 2);
            $scope.todaysOrders.push(testCopy);
        }

        /*
        let modifyList = [
            {
                key: 'menuItem',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: 'veggie lovers'
            },
            {
                key: 'size',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: 'small'
            },
            {
                key: 'sale',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: '75 units'
            },
            {
                key: 'unitCost',
                operation: 'explicitReplace',
                searchString: 'na',
                operand: '$11.99'
            }
        ];
        $scope.todaysOrders = [];
        $scope.todaysOrders.push($scope.seedObject);
        let testCopy = {};
        deepCopy($scope.seedObject, testCopy, modifyList);
        $scope.todaysOrders.push(testCopy);
        */
       // $scope.allDaysData.push()
    }
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            width: 800,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
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
                axisLabel: 'Index'
            },
            yAxis: {
                axisLabel: 'Random Generated',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: true,
            text: 'Demo showing NVD3 Angular with Interval for animation'
        },
        subtitle: {
            enable: true,
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
   
});
test_stats_app.controller('DemoCtrl', function ($scope, $interval) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            width: 500,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
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
                axisLabel: 'Time (ms)'
            },
            yAxis: {
                axisLabel: 'Voltage (v)',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: true,
            text: 'Demo showing sin and cosine'
        },
        subtitle: {
            enable: true,
            text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: true,
            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
    };
    $scope.format = 'M/d/yy h:mm:ss a';
    $scope.blood_1 = 100;
    $scope.blood_2 = 120;

    var stop;
    $scope.fight = function () {
        // Don't start a new fight if we are already fighting
        if (angular.isDefined(stop)) return;

        stop = $interval(function () {
            if ($scope.blood_1 > 0 && $scope.blood_2 > 0) {
                $scope.blood_1 = $scope.blood_1 - 3;
                $scope.blood_2 = $scope.blood_2 - 4;
            } else {
                $scope.stopFight();
            }
        }, 100);
    };

    $scope.stopFight = function () {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
        }
    };

    $scope.resetFight = function () {
        $scope.blood_1 = 100;
        $scope.blood_2 = 120;
    };

    $scope.$on('$destroy', function () {
        // Make sure that the interval is destroyed too
        $scope.stopFight();
    });
    $scope.data = sinAndCos();
    $scope.values1 = [];
    $scope.values2 = [];
    $scope.values3 = [];
    $scope.valuesAverage = [];
    function randomDataGenerator()
    {
        if ($scope.values1.length < 1)
        {
            for (var i = 0; i < 100; i++)
            {
                $scope.values1.push({ x: i, y: Math.random()* 100 });
                $scope.values2.push({ x: i, y: Math.random() * 96.78 });
                $scope.values3.push({ x: i, y: Math.random() * 78.6 });
                var average = parseFloat($scope.values1[i].y + $scope.values2[i].y + $scope.values2[i].y) / 3.00;
                $scope.valuesAverage.push(average);
            }
 

        }
        else {
            for (var i = 0; i < 99; i++) {
                $scope.values1[i] = $scope.values1[i+1];
                $scope.values2[i] = $scope.values2[i + 1];
                $scope.values3[i] = $scope.values3[i + 1];
                var average = parseFloat($scope.values1[i].y + $scope.values2[i].y + $scope.values2[i].y) / 3.00;
                $scope.valuesAverage[i] = $scope.valuesAverage[i + 1];
            }
            $scope.values1[99] = { x: 99, y: Math.random()* 100 };
            $scope.values2[99] = { x: 99, y: Math.random() * 96.78 };
            $scope.values3[99] = { x: 99, y: Math.random() * 96.78 };
            var nAverage = parseFloat($scope.values1[99].y + $scope.values2[99].y + $scope.values2[99].y) / 3.00;
            $scope.valuesAverage[99] = nAverage;
           
        }

    }
    /*Random Data Generator */
    function sinAndCos() {
        var sin = [], sin2 = [],
            cos = [],
            tan = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: Math.sin(i / 10) });
            sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
            cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
            tan.push({ x: i, y: Math.cos(i / 10) });

        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e',  //color - optional: choose your own line color.
                strokeWidth: 2,
                classed: 'dashed'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            },
            {
                values: sin2,
                key: 'Another sine wave',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
            ,
            {
                values: tan,
                key: 'Tan wave',
                color: '#FF77ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };
});
test_stats_app.controller('StatsCtrl', function ($scope) {
    $scope.options = {
        chart: {
            type: 'lineChart',
            height: 450,
            width: 500,
            margin: {
                top: 20,
                right: 20,
                bottom: 40,
                left: 55
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
                axisLabel: 'Time (ms)'
            },
            yAxis: {
                axisLabel: 'Voltage (v)',
                tickFormat: function (d) {
                    return d3.format('.02f')(d);
                },
                axisLabelDistance: -10
            },
            callback: function (chart) {
                console.log("!!! lineChart callback !!!");
            }
        },
        title: {
            enable: true,
            text: 'Statistics'
        },
        subtitle: {
            enable: true,
            text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
            css: {
                'text-align': 'center',
                'margin': '10px 13px 0px 7px'
            }
        },
        caption: {
            enable: true,
            html: '<b>Figure 1.</b> Lorem ipsum dolor sit amet, at eam blandit sadipscing, <span style="text-decoration: underline;">vim adhuc sanctus disputando ex</span>, cu usu affert alienum urbanitas. <i>Cum in purto erat, mea ne nominavi persecuti reformidans.</i> Docendi blandit abhorreant ea has, minim tantas alterum pro eu. <span style="color: darkred;">Exerci graeci ad vix, elit tacimates ea duo</span>. Id mel eruditi fuisset. Stet vidit patrioque in pro, eum ex veri verterem abhorreant, id unum oportere intellegam nec<sup>[1, <a href="https://github.com/krispo/angular-nvd3" target="_blank">2</a>, 3]</sup>.',
            css: {
                'text-align': 'justify',
                'margin': '10px 13px 0px 7px'
            }
        }
    };

    $scope.data = sinAndCos();

    /*Random Data Generator */
    function sinAndCos() {
        var sin = [], sin2 = [],
            cos = [],
            tan = [];

        //Data is represented as an array of {x,y} pairs.
        for (var i = 0; i < 100; i++) {
            sin.push({ x: i, y: Math.sin(i / 10) });
            sin2.push({ x: i, y: i % 10 == 5 ? null : Math.sin(i / 10) * 0.25 + 0.5 });
            cos.push({ x: i, y: .5 * Math.cos(i / 10 + 2) + Math.random() / 10 });
            tan.push({ x: i, y: Math.cos(i / 10) });

        }

        //Line chart data should be sent as an array of series objects.
        return [
            {
                values: sin,      //values - represents the array of {x,y} data points
                key: 'Sine Wave', //key  - the name of the series.
                color: '#ff7f0e',  //color - optional: choose your own line color.
                strokeWidth: 2,
                classed: 'dashed'
            },
            {
                values: cos,
                key: 'Cosine Wave',
                color: '#2ca02c'
            },
            {
                values: sin2,
                key: 'Another sine wave',
                color: '#7777ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
            ,
            {
                values: tan,
                key: 'Tan wave',
                color: '#FF77ff',
                area: true      //area - set to true if you want this line to turn into a filled area chart.
            }
        ];
    };
});
