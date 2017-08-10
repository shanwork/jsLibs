(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('HealthStatsController',function($scope,$interval, $rootScope, $localStorage, Hub ){
        
        $scope.statsOptions = {
            chart: {
                type: 'multiChart',
                height: 300,
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
        // flat average average of each %age of level over healthy level
        $scope.calculateHealth = function(patientReadings){
            let averageHealth = 1.0;
            let percentSystolic = (parseFloat(patientReadings.systolic) / 120.00 );
            let percentDiastolic = (parseFloat(patientReadings.diastolic) / 80.00 );
            let percentCholesterol = (parseFloat(patientReadings.cholesterol) / 200.00 );
            averageHealth = Math.round(((percentSystolic+ percentDiastolic + percentCholesterol) / 3.00 ) * 100);
            return averageHealth; 
            
        }
        $scope.plotPoint = function(patientReadings, index){
            let yVal = $scope.calculateHealth(patientReadings);
            let currentPlotIndex = $scope.statsData[index].values.length ;
            if (currentPlotIndex >= 7)
                {
                    for (let shiftIndex = 0 ; shiftIndex < currentPlotIndex-1; shiftIndex++){
                        $scope.statsData[index].values[shiftIndex+1].x = $scope.statsData[index].values[shiftIndex].x;
                    }
                    $scope.statsData[index].values.shift();
                 //   currentPlotIndex = 7;
                }
            console.log(index + ", x:" + ", y:" + yVal);
                $scope.statsData[index].values.push({x:currentPlotIndex, y:yVal});
            console.log($scope.statsData[index].values);
        }
        let start;
        $scope.startPoll = function() {
             if (angular.isDefined( start)){
                 return ;
             }
             start =$interval(function() {
                for (let pIndex = 0; pIndex < $scope.fivePatientData.length;pIndex++){
               // $scope.fivePatientData.forEach(function(patient) {
                    $scope.generateRandomData($scope.fivePatientData[pIndex], pIndex);
                    $scope.plotPoint($scope.fivePatientData[pIndex], pIndex);
                 //   $scope.$watch($scope.fivePatientData[pIndex]);
                };//)
            },2000 );
        }
            $scope.endPoll = function(){
                if (angular.isDefined( start)){
                
                $interval.cancel( start);
                 start = undefined;
            }
            }
        $scope.markValue = function(id, value, cutoff){
            return (value <= cutoff? 'goodValue': 'badValue');
        }
        $scope.getLevelClass = function(level,cutoff){
              
            return (level <= cutoff? 'goodValue': 'badValue');
        }
        $scope.curePatient = function(index){
            if (index == 1){
                $scope.fivePatientData.shift();
            }
            else {
                     $scope.fivePatientData.splice(index-1,1)
                }
            $scope.fivePatientData.push($scope.generateRandomDataObject($scope.seedObject, $scope.patientIndex++, $scope.modifyList));
        }
        $scope.mathRandom = function(maxValue, lowerLimit,   integer=true){ 
            // optional param later, right now just using this function for int
            let z = Math.round(Math.random()* parseInt(maxValue))  ;
            if (z < lowerLimit)
                z = lowerLimit;
            return z;
        }
        $scope.init = function() {
            $scope.statsData = [
               
            ]
            for (let pI =0 ; pI < 5 ; pI++){
            let patientPlot = {};
                patientPlot.type="line";
                patientPlot.key="Patient" + (pI+1);
                patientPlot.values = [];
                patientPlot.yAxis=1;
                $scope.statsData.push(patientPlot);
            }
            $scope.statsAPI = MathsAndStats();
            $scope.objectUtilsAPI = JSObjects() ;
            // ranges
            $scope.minAge = 40;
            $scope.maxAge= 95;
            $scope.minSystolic = 111;
            $scope.maxSystolic = 200;
            $scope.minDiastolic = 70;
            $scope.maxDiastolic = 120;
            $scope.minCholesterol = 190;
            $scope.maxCholesterol = 350; 
            
            $scope.fivePatientData = [];
            $scope.seedObject = {
                name: 'patient1',
                age: 45,
                systolic: 155,
                diastolic: 102,
                cholesterol: 234
            }
            let initialObject = {
            }
            $scope.objectUtilsAPI.deepCopy($scope.seedObject, initialObject);
            $scope.fivePatientData.push(initialObject);
            
            $scope.modifyList =  
                [
                    { key: 'name',operation: 'explicitReplace', searchString: 'na',operand: ''},
                    { key: 'age',operation: 'explicitReplace', searchString: 'na',operand: ''},
                    { key: 'systolic',operation: 'explicitReplace', searchString: 'na',operand: ''},
                    { key: 'diastolic',operation: 'explicitReplace', searchString: 'na',operand: ''},
                    { key: 'cholesterol',operation: 'explicitReplace', searchString: 'na',operand: ''}
                ];
            for (let k = 2; k < 6; k++)
                {
                   
                     $scope.fivePatientData.push($scope.generateRandomDataObject(initialObject, k, $scope.modifyList));
                }
            $scope.patientIndex = 6 ;
        }
        $scope.generateRandomDataObject= function(src, index, modifyList){
            let minBadHealthCriterion = false ;
             modifyList[0].operand= 'paitent' + index;
             modifyList[1].operand= $scope.mathRandom($scope.maxAge,$scope.minAge ) ;
             modifyList[2].operand= $scope.mathRandom($scope.maxSystolic,$scope.minSystolic ) ;
             if(parseInt(modifyList[2].operand) > 150)
                 minBadHealthCriterion = true;
            modifyList[3].operand= $scope.mathRandom($scope.maxDiastolic,minBadHealthCriterion==true? 80:101 ) ;
            if(parseInt(modifyList[3].operand) > 100)
                 minBadHealthCriterion = true;
            modifyList[4].operand= $scope.mathRandom($scope.maxCholesterol,minBadHealthCriterion==true? 230:271 ) ;
            let clone = {} ;
            $scope.objectUtilsAPI.deepCopy(src, clone, modifyList);
            return clone;
             
            
        }
        // will use deepModify from jSobjects once tested
        $scope.generateRandomData= function(patient, index) { //, modifyList){
            patient.systolic= $scope.mathRandom($scope.maxSystolic,$scope.minSystolic ) ;
            let systolicDom = DOMElement('systolic'+ index);
            systolicDom.conditionExpressionClass(patient.systolic<= $scope.minSystolic,'goodValue', 'badValue')
            patient.diastolic= $scope.mathRandom($scope.maxDiastolic,$scope.minDiastolic ) ;
            let diastolicDom = DOMElement('diastolic'+ index);
            diastolicDom.conditionExpressionClass(patient.diastolic<= $scope.minDiastolic,'goodValue', 'badValue')
            patient.cholesterol= $scope.mathRandom($scope.maxCholesterol,$scope.minCholesterol) ;
            let cholesterolDom = DOMElement('cholesterol'+ index);
            cholesterolDom.conditionExpressionClass(patient.cholesterol<= $scope.minCholesterol,'goodValue', 'badValue')
            
        }
        $scope.init();
    });
})();