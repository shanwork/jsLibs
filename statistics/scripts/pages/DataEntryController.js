angular.module('test_stats_app').controller('DataEntryController',function($scope, $rootScope ){
    
     $scope.init = function () {
        $scope.sameDayCloneNumber = 10;
        $scope.daysToRepeatNumber = 14;
        $scope.initialUnits = 3;
        $scope.maxUnits = 200;
        $scope.minUnits = 2;
        $scope.initDate =  new Date('2017-07-05').toDateString();
        $scope.seedObject = { 'menuItem': 'margarita pizza', 'size': 'personal', 'quantitySold': $scope.initialUnits  , 'unitCost': '7.99', 'date': "'" + $scope.initDate + "'", 'postTaxProfit':'1.25' };
        $scope.seedObjectString = JSON.stringify($scope.seedObject);
        $scope.allDaysData = { 
            dailyOrders: [],
            revenueList:[],
            quanityList:[],
            profitList:[],
            data: [
                     { values: [], 
                        key: 'revenues', //key  - the name of the series.
                        color: '#ff7f0e',
                        strokeWidth: 2,
                        
                    },
                    {
                        values:  [],
                        key: 'quantities',
                        color: '#2ca02c'
                    },
                    {
                        values: [],
                        key: 'Profits',
                        color: '#7777ff'
                    }
                ]   
        };
    }
    $scope.init();
    // have no clue why addDays doesnt work with angular
    $scope.addDate = function(dateItem, day=1, monthP=1, yearP=1){
        let test = new Date(dateItem);
        let date = test.getDate()  ;
        
        let month = test.getMonth()+1;
        let year = test.getFullYear();
        date += day;
        // to cut short stuff, let's just go with 28
        if (date > 28){
            date =1 ;
            month++;
            if (month > 12){
                year++;
                month = 1;
            }
        }
        return new Date(year + '-' + month + '-' + date );
        
    }
        $scope.generateTestData = function () {
        // 2 dimensional data -
        // order data per day x orders TIMES y days
        
         
        let dayCloneStartindex=1;
        for (let days = 0 ; days < $scope.daysToRepeatNumber; days++){
            let todaysOrdersList = {
                expand: false,// UI toggle
                date: '',
                totalDailyRevenue: 0.0, // adds total cost of each order item
                totalDailyProfit: 0.0, // adds total cost of each order item
                totalQuantitiesSold: 0, // adds quantity of each order item
                orders : [] // orde items
            } ;
            todaysOrdersList.date = $scope.seedObject.date ;
              todaysOrdersList.data     =[
                     { values: [], 
                        key: 'quantity', //key  - the name of the series.
                        color: '#ff7f0e',
                        strokeWidth: 2,
                        classed: 'dashed'
                    },
                    {
                        values:  [],
                        key: 'Cost',
                        color: '#2ca02c'
                    },
                    {
                        values: [],
                        key: 'Profit',
                        color: '#7777ff'
                    }
                ];    
            if (days == 0 ) { // copy the seed object as is for the very first record
                var initObject = {};
                // we dont push seed object, but a deepcopy of the same because otherwise, a REFERENCE of seedboject is pushed, 
                // so when the date changes, it would reflect in all pushed instances of an uncopied seed
                // ### Note for deep copy and modifyList go to util.js for documentation
                deepCopy($scope.seedObject, initObject);
                initObject.totalCost = decimalRound($scope.initialUnits * parseFloat($scope.seedObject.unitCost),2);
                initObject.totalProfit = decimalRound(parseFloat(initObject.quantitySold) * parseFloat(initObject.postTaxProfit), 2);
                todaysOrdersList.totalQuantitiesSold += initObject.quantitySold;
                todaysOrdersList.totalDailyRevenue += initObject.totalCost;
                todaysOrdersList.totalDailyProfit += initObject.totalProfit;
                
                todaysOrdersList.orders.push(initObject);
                todaysOrdersList.data[0].values.push({x:1, y:initObject.quantitySold})  ;
            todaysOrdersList.data[1].values.push({x:1, y:initObject.totalCost})  ;
            todaysOrdersList.data[2].values.push({x:1, y:initObject.totalProfit}) ;
            }
            else 
                dayCloneStartindex = 0;
            for (let index = dayCloneStartindex; index < $scope.sameDayCloneNumber; index++)
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
                        key: 'quantitySold',
                        operation: 'explicitReplace',
                        searchString: 'na',
                        operand: parseInt(Math.random() * 5) 
                    },
                    {
                        key: 'unitCost',
                        operation: 'explicitReplace',
                        searchString: 'na',
                        operand: refMenuItems[jsonIndex].unitCost
                    },
                    ,
                    {
                        key: 'postTaxProfit',
                        operation: 'explicitReplace',
                        searchString: 'na',
                        operand: refMenuItems[jsonIndex].postTaxProfit
                    }
                ];
                let testCopy = {};
                deepCopy($scope.seedObject, testCopy, modifyList);
                if(testCopy.quantitySold==0)
                    testCopy.quantitySold=1 ;
                
                testCopy.totalCost = decimalRound(parseFloat(testCopy.quantitySold) * parseFloat(testCopy.unitCost), 2);
                testCopy.totalProfit = decimalRound(parseFloat(testCopy.quantitySold) * parseFloat(testCopy.postTaxProfit), 2);
                todaysOrdersList.totalDailyRevenue += testCopy.totalCost;
                todaysOrdersList.totalDailyProfit += testCopy.totalProfit;
                console.log('total quanity, ', todaysOrdersList.totalQuantitiesSold, ' this order ', testCopy.menuItem,' quantity, ', testCopy.quantitySold)
                todaysOrdersList.totalQuantitiesSold += testCopy.quantitySold;
            /* 
               // Remove this logic for now, so the graph, which is 'redundant' data corresponds, 
              // will circle around to make this the reference, not the redundant/ duplicate entries
               let foundItem = todaysOrdersList.orders.find(function(itemToScan){
                    return (itemToScan.menuItem == testCopy.menuItem && itemToScan.size==testCopy.size)
                })
                if (foundItem )
                    {
                        foundItem.quantitySold  += parseInt(testCopy.quantitySold);
                        foundItem.totalCost  += parseFloat(testCopy.totalCost);
                        foundItem.totalProfit  += parseFloat(testCopy.totalProfit);
                    }
                else 
                */ 
                    todaysOrdersList.orders.push(testCopy);
            todaysOrdersList.data[0].values.push({x:(index+1), y:testCopy.quantitySold})  ;
            todaysOrdersList.data[1].values.push({x:(index+1), y:testCopy.totalCost})  ;
            todaysOrdersList.data[2].values.push({x:(index+1), y:testCopy.totalProfit}) ;
             
            } // day clone loop
            todaysOrdersList.totalDailyRevenue = decimalRound(todaysOrdersList.totalDailyRevenue,2);
            todaysOrdersList.totalDailyProfit = decimalRound(todaysOrdersList.totalDailyProfit,2);
            $scope.allDaysData.dailyOrders.push(todaysOrdersList);
            $scope.allDaysData.revenueList.push(todaysOrdersList.totalDailyRevenue);
            $scope.allDaysData.quanityList.push(todaysOrdersList.totalQuantitiesSold);
            $scope.allDaysData.profitList.push(todaysOrdersList.totalDailyProfit);
            $scope.allDaysData.data[0].values.push({x:days, y:todaysOrdersList.totalDailyRevenue});
            $scope.allDaysData.data[1].values.push({x:days, y:todaysOrdersList.totalQuantitiesSold});
            $scope.allDaysData.data[2].values.push({x:days, y:todaysOrdersList.totalDailyProfit});
            $scope.allDaysData.quanityList.push(todaysOrdersList.totalQuantitiesSold);
            $scope.allDaysData.profitList.push(todaysOrdersList.totalDailyProfit);
             var newdate = $scope.addDate($scope.seedObject.date) ;
             
              $scope.seedObject.date = "'" +  newdate.toDateString() + "'";
           // $scope.seedObject.date.addDays(1);
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
