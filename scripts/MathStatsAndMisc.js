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
    
                            }
    } // prototype
    
    // like the constructor
    MathsAndStats.init = function()
    {
        
    }
    MathsAndStats.init.prototype = MathsAndStats.API;
    global.MathsAndStats = MathsAndStats;
}(window));