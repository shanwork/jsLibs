(function () {
    'use strict'
    
    angular.module('test_stats_app').controller('HealthStatsController',function($scope, $rootScope, $localStorage, Hub ){
        $scope.markValue = function(id, value, cutoff){
            return(value <= cutoff? 'goodValue': 'badValue');
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
            $scope.statsAPI = MathsAndStats();
            $scope.objectUtilsAPI = JSObjects() ;
            
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
             modifyList[1].operand= $scope.mathRandom(95,40 ) ;
             modifyList[2].operand= $scope.mathRandom(200,111 ) ;
             if(parseInt(modifyList[2].operand) > 150)
                 minBadHealthCriterion = true;
            modifyList[3].operand= $scope.mathRandom(120,minBadHealthCriterion==true? 80:101 ) ;
            if(parseInt(modifyList[3].operand) > 100)
                 minBadHealthCriterion = true;
            modifyList[4].operand= $scope.mathRandom(350,minBadHealthCriterion==true? 230:271 ) ;
            let clone = {} ;
            $scope.objectUtilsAPI.deepCopy(src, clone, modifyList);
            return clone;
             
            
        }
        $scope.init();
    });
})();