(function (global){
    
   var MathsAndStats = function(){
        return new MathsAndStats.init();
    }
   MathsAndStats.API = 
   {
       decimalRound: function(num, decPlaces) {
                        let multiplyBy = Math.pow(10, decPlaces);
                        num *= multiplyBy;
                        return parseFloat(Math.round(num))/ parseFloat(multiplyBy);
                    },
        // Circle area and cicumference
        circleArea:function (radius,decPlaces=4, roundOff=true) {
                         if (roundOff)
                            // closest we get to a static?
                            return (
                                MathsAndStats.API.decimalRound(radius*radius * 
                                                   (22.0/7.0),decPlaces)) ; 
                        return radius * radius * (22.0/7.0);
                    },
       circleCircumference: function(radius, decPlaces=4, roundOff=true){
                          if (roundOff)
                            // closest we get to a static?
                            return (
                                MathsAndStats.API.decimalRound(radius * 2 * (22.0/7.0),decPlaces)) ;
                            return radius * 2 * (22.0/7.0);
    
                            },
       // statistical functions
       average: function(numbersToAverage, decPlaces=4, roundOff=true){
                            let totalELements = numbersToAverage.length;
                            let totalElementsSum = 0.0;
                            numbersToAverage.forEach(function(element) { 
                                    totalElementsSum += parseFloat(element);
                            });
                            if (roundOff)
                                    return (MathsAndStats.API.decimalRound( totalElementsSum/parseFloat(totalELements) ,decPlaces)) ;
                            return totalElementsSum/parseFloat(totalELements);
                            },
       meanDeviation: function(numbersToMeanDeviation, decPlaces=4, roundOff=true){
                                let totalELements = numbersToMeanDeviation.length;
                                let totalElementsDiffWithAvg = 0.0;
                                // 1. calculate the average
                                let mean = MathsAndStats.API.average(numbersToMeanDeviation,null, false) ;// round off at the end, we keep all decimal places until the last calculation
                                // 2. get the positive difference between each number and the average and add them
                                numbersToMeanDeviation.forEach(function(element) { 
                                        totalElementsDiffWithAvg += Math.abs  ((element - mean),2);
                                });
                                // 3. mean deviation - divide the above sum by the number of elements
                                if (roundOff)
                                    return (MathsAndStats.API.decimalRound(totalElementsDiffWithAvg/parseFloat(totalELements),decPlaces) ) ;
                                return totalElementsDiffWithAvg/parseFloat(totalELements);
                        },
        variance: function(numbersToVariance, decPlaces=4, roundOff=true){
                                let totalELements = numbersToVariance.length;
                                let totalElementsMinusAvgSquare = 0.0;
                                // 1. calculate the average
                                let mean = MathsAndStats.API.average(numbersToVariance,null, false) ;// round off at the end, we keep all decimal places until the last calculation
                                // 2. square the difference between each number and the average and add them
                                numbersToVariance.forEach(function(element) { 
                                        totalElementsMinusAvgSquare += Math.pow((element - mean),2);
                                });
                                // 3. Variance - divide the above sum by the number of elements
                                if (roundOff)
                                    return (MathsAndStats.API.decimalRound(totalElementsMinusAvgSquare/parseFloat(totalELements),decPlaces) ) ;
                                return totalElementsMinusAvgSquare/parseFloat(totalELements);
                    },
        standardDeviation: function(numbersToStdDev, decPlaces=4, roundOff=true){
                                // the first three steps are done in the variance method
                                var varianceNum = MathsAndStats.API.variance(numbersToStdDev, null, false );// round off at the end, we keep all decimal places until the last calculation
                                if (roundOff)
                                    return (MathsAndStats.API.decimalRound(Math.sqrt(varianceNum),decPlaces)) ;
                                return Math.sqrt(varianceNum) ;
                            }
       
    } // prototype for MathsAndStats
    
    // like the constructor
    MathsAndStats.init = function()
    {
        
    }
    MathsAndStats.init.prototype = MathsAndStats.API;
    global.MathsAndStats = MathsAndStats;
}(window));