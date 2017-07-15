
(function () {
    'use strict';
    angular.module('test_stats_app').factory("Hub", ['$http', '$q' ,
          function ($http, $q ) {
              
              var Hub = {};
              
              // angular seems to have overridden the addDays API. right now, functional for addDays only
              Hub.addDate = function(dateItem, day=1, monthP=1, yearP=1){
                  
                  let srcDate = new Date(dateItem);
                  let date = srcDate.getDate()  ;
                  let month = srcDate.getMonth()+1;
                  let year = srcDate.getFullYear();
                  
                  date += day;
                  if (
                      ((month==1 || month==3 || month==5 || month == 7 || month == 8 || month == 10 || month == 12 ) &&  date > 31)||
                      (month == 2 && year% 4 != 0 && date> 28) ||
                      (month == 2 && date > 29 ) ||
                      date > 30
                  ){
                      date =1 ;
                      month++;
                      if (month > 12){
                          year++;
                          month = 1;
                      }
                  }
                  return new Date(year + '-' + month + '-' + date );
              }
              
              Hub.initializeDayData = function(allDaysData){
                  allDaysData.totalRevenue = 0.0 ;
                  allDaysData.totalQuantity  = 0;
                  allDaysData.totalProfit = 0.0;
                  allDaysData.dailyOrders = [];
                  allDaysData.revenueList = [] ;
                  allDaysData.quanityList  = [] ;
                  allDaysData.profitList = [] ;
                  allDaysData.data = [
                      { 
                          values: [],
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
                      },
                      {
                          values: [],
                          key: 'Average Revenue',
                          color: '#ff1177',
                          strokeWidth:2,
                          classed: 'dashed'
                      },
                      {
                          values: [],
                          key: 'Average Quantity',
                          color: '#ff7711',
                          strokeWidth:3,
                          classed: 'dashed'
                      },
                      {
                          values: [],
                          key: 'Average Profit',
                          color: '#11ff77',
                          strokeWidth:4,
                          classed: 'dashed'
                      }
                  ];
              }
              
              
              Hub.generateTestData = function(allDaysData, seedObject,daysToRepeatNumber,sameDayCloneNumber){
                  this.initializeDayData(allDaysData) ;
                  let initialUnits = 3;
                  let maxUnits = 200;
                  let minUnits = 14;
                  let initDate =  new Date('2017-07-04').toDateString();
                  let dayCloneStartindex=1;
                  for (let days = 0 ; days <  daysToRepeatNumber; days++){
                      let todaysOrdersList = {
                          date: '',
                          totalDailyRevenue: 0.0, // adds total cost of each order item
                          totalDailyProfit: 0.0, // adds 'post tax' profit of each order item
                          totalQuantitiesSold: 0, // adds quantity of each order item
                          orders : [] // orde items
                      } ;
                      todaysOrdersList.date = seedObject.date ;
                      todaysOrdersList.data = [
                          { 
                              values: [],
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
                          let initObject = {};
                          // we dont push seed object, but its deepcopy otherwise, a REFERENCE of seedboject is pushed, 
                          // so when the date changes, it would reflect in all pushed instances of an uncopied seed
                          // ### Note for deep copy and modifyList go to util.js for documentation
                          deepCopy( seedObject, initObject);
                          initObject.totalCost = decimalRound( initialUnits * parseFloat( seedObject.unitCost),2);
                          initObject.totalProfit = 
                                decimalRound(parseFloat(initObject.quantitySold) * parseFloat(initObject.postTaxProfit), 2);
                          
                          todaysOrdersList.totalQuantitiesSold += initObject.quantitySold;
                          todaysOrdersList.totalDailyRevenue += initObject.totalCost;
                          todaysOrdersList.totalDailyProfit += initObject.totalProfit;
                          
                          todaysOrdersList.orders.push(initObject);
                          // graph
                          todaysOrdersList.data[0].values.push({x:1, y:initObject.quantitySold}) ;
                          todaysOrdersList.data[1].values.push({x:1, y:initObject.totalCost}) ;
                          todaysOrdersList.data[2].values.push({x:1, y:initObject.totalProfit}) ;
                      }
                      else {
                          dayCloneStartindex = 0;
                      }
                      for (let index = dayCloneStartindex; index <  sameDayCloneNumber; index++) {
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
                              {
                                  key: 'postTaxProfit',
                                  operation: 'explicitReplace',
                                  searchString: 'na',
                                  operand: refMenuItems[jsonIndex].postTaxProfit
                              }
                          ];
                          let addClone= {};
                          deepCopy( seedObject, addClone, modifyList);
                          if(addClone.quantitySold==0)
                              addClone.quantitySold=1 ;
                          addClone.totalCost = decimalRound(parseFloat(addClone.quantitySold) * parseFloat(addClone.unitCost), 2);
                          addClone.totalProfit = 
                              decimalRound(parseFloat(addClone.quantitySold) * parseFloat(addClone.postTaxProfit), 2);
                          todaysOrdersList.totalDailyRevenue += addClone.totalCost;
                          todaysOrdersList.totalDailyProfit += addClone.totalProfit;
                          console.log('total quanity, ', 
                                      todaysOrdersList.totalQuantitiesSold, 
                                      ' this order ', addClone.menuItem,' quantity, ', 
                                      addClone.quantitySold);
                          todaysOrdersList.totalQuantitiesSold += addClone.quantitySold;
                          
                          /*
                          // Removed this logic for now, so the graph, which is 'redundant' data corresponds, 
                          // will circle around to make this the reference, not the redundant/ duplicate entries
                          let foundItem = todaysOrdersList.orders.find(function(itemToScan){
                              return (itemToScan.menuItem == addClone.menuItem && itemToScan.size==addClone.size)
                           })
                          if (foundItem )
                          {
                              foundItem.quantitySold  += parseInt(addClone.quantitySold);
                              foundItem.totalCost  += parseFloat(addClone.totalCost);
                              foundItem.totalProfit  += parseFloat(addClone.totalProfit);
                          }
                          else   */ 
                              todaysOrdersList.orders.push(addClone);
                          // graph data
                          todaysOrdersList.data[0].values.push({x:(index+1), y:addClone.quantitySold})  ;
                          todaysOrdersList.data[1].values.push({x:(index+1), y:addClone.totalCost})  ;
                          todaysOrdersList.data[2].values.push({x:(index+1), y:addClone.totalProfit}) ;
                      } // day clone loop
                      
                      todaysOrdersList.totalDailyRevenue = decimalRound(todaysOrdersList.totalDailyRevenue,2);
                      todaysOrdersList.totalDailyProfit = decimalRound(todaysOrdersList.totalDailyProfit,2);
                      
                      allDaysData.dailyOrders.push(todaysOrdersList);
                      
                      allDaysData.totalRevenue += todaysOrdersList.totalDailyRevenue ;
                      allDaysData.revenueList.push(todaysOrdersList.totalDailyRevenue);
                      
                      allDaysData.totalQuantity += todaysOrdersList.totalQuantitiesSold ;
                      allDaysData.quanityList.push(todaysOrdersList.totalQuantitiesSold);
                      
                      allDaysData.totalProfit += todaysOrdersList.totalDailyProfit ;
                      allDaysData.profitList.push(todaysOrdersList.totalDailyProfit);
                      
                      allDaysData.data[0].values.push({x:days, y:todaysOrdersList.totalDailyRevenue});
                      allDaysData.data[1].values.push({x:days, y:todaysOrdersList.totalQuantitiesSold});
                      allDaysData.data[2].values.push({x:days, y:todaysOrdersList.totalDailyProfit});
                      allDaysData.quanityList.push(todaysOrdersList.totalQuantitiesSold);
                      allDaysData.profitList.push(todaysOrdersList.totalDailyProfit);
                      
                      var newdate = this.addDate( seedObject.date) ;
                      seedObject.date = "'" +  newdate.toDateString() + "'";
                      allDaysData.endDate = newdate.toDateString();
                      //  seedObject.date.addDays(1);
                  } 
                  
                  let averageRevenues = [];
                  allDaysData.data[0].values.forEach(function(revenue){
                      averageRevenues.push(revenue.y);
                  });
                  let revenueAverage = average(averageRevenues, 2, true ) ;
                  for (let rev = 0; rev < averageRevenues.length; rev++){
                      allDaysData.data[3].values.push({x:rev, y:revenueAverage});
                  }
                  
                  let averageQuantities = [];
                  allDaysData.data[1].values.forEach(function(quantity){
                      averageQuantities.push(quantity.y);
                  });
                  let quantityAverage = average(averageQuantities, 2, true ) ;
                  for (let rev = 0; rev < averageQuantities.length; rev++){
                      allDaysData.data[4].values.push({x:rev, y:quantityAverage});
                  }
                  
                  var averageProfits = [];
                  allDaysData.data[2].values.forEach(function(quantity){
                      averageProfits.push(quantity.y);
                  });
                  let profitAverage = average(averageProfits, 2, true ) ;
                  for (let rev = 0; rev < averageProfits.length; rev++){
                      allDaysData.data[5].values.push({x:rev, y:profitAverage});
                  }
              }
             
              return Hub;

          } ]);
})();