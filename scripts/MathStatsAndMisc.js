/*
Welcome to my framework APIs
As on July 27, 2017 the APIS are two groups, second is really just a single function at this stage but it made sense to keep it in 
a separate group

( <..> = optional argument )
1. MathsAndStats
  usage : 
   let stats = MathsAndStats();
   let average = stats.average([1,2,3,4,5,78], 3);
   ..
 APIs ( '<roundOff>' is redundant, we can use presence of absence of '<decPlaces>' to decide whether to round off or not)
  - decimalRound(number, decPlaces) - rounds number to 'decPlaces' decimal places
  - circleArea( radius, <decPlaces>,<roundOff?> ) - area of a circle, given radius
  - circleCircumference( radius, <decPlaces>,<roundOff?> ) - circumference of a circle, given radius
  - average(arrayOfNumbers, <decPlaces>,<roundOff?> ) 
  - meanDeviation(arrayOfNumbers, <decPlaces>, <roundOff>)
  - variance(arrayOfNumbers, <decPlaces>, <roundOff>) 
  - standardDeviation(arrayOfNumbers, <decPlaces>, <roundOff>) 
  
 2. JSObjects
    usage : 
   let objectUtils = JSObjects();
    
   - deepCopy
    usage and example
    var testObject = { x: 3, y: { a:1, b:2}, z: [1,2,3,4]};
   var copyTo = {} ;
   var keymodifiers = [{key: 'x', operation: '+', operand: '1'}, {key: 'z', operation: 'concat', operand: '5'}
   objectUtils.deepCopy(testObject,copyTo,keymodifiers)
   // copyTo ={ x: 4, y: { a:1, b:2}, z: [15,25,35,45]};
The function below is used to deep (non reference ) copy an object to another, ie the source and destination
objects are in totally different location; simply put changing the source object will not affect the destination object and vice versa

Using object.values, typeOf, isArray and recusrsion, this builds the destination object element by element, layer by layer.
Works for combination of JSON type objects and Arrays; havent implemented yet for functions.at
### STill some other use cases to take care of in nesting, array drill down, etc ###

3. DOMManipulator
   Useful for custom DOM Manipulation. Implemented some (admittedly random) element look, feel and content APIs
   let domElemment = DOMManipulator(elementID);
   
   - display(displayStyle)       sets display mode of the element(block, none, etc)
   - text(textToAdd, style=null) sets the text of the element, optionally, sets the style
   (below functions:
       override=false, means it appends to existing style,true = override the style)
   - background(backGroundStyle, override=false) sets background color
   - foreground(foreGroundStyle, override=false) sets color
   - border(borderStyle, override=false ) sets border style.  
   - fade(startOpacity, endOpacity, timeInt ) fade in or out based on two opacities, in timeInt ms
   - conditionExpressionStyle(expression, styleTrue, styleFalse) sets styleTrue or styleFalse based on condiiton expression
*/

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
    
    /* --------------------------------------------------------------------------------------- */
     var JSObjects = function() {
        return new JSObjects.init() ;
    }
    JSObjects.API = 
    {
        // this is a util function
        keyModify: function(key,keyName, originalValue, modifyList ) {
                      let returnValue = originalValue;
                      
                      modifyList.forEach(function (keyElement){
                            if (keyElement.key== keyName){
                                switch(keyElement.operation){
                                    case '+' : originalValue  += parseFloat(keyElement.operand);
                                        break;
                                    case '-' :  originalValue  -= parseFloat(keyElement.operand);
                                        break;
                                    case '*' :  originalValue  *= parseFloat(keyElement.operand);
                                        break;
                                    case '//' :  originalValue  /= parseFloat(keyElement.operand);
                                        break;
                                    case 'concat' :  originalValue +=  keyElement.operand ;
                                        break;
                                    case 'explicitReplace' :  originalValue = keyElement.operand;
                                            break;
                                    case 'searchReplace' :  if(keyElement.searchString && originalValue.indexOf(keyElement.searchString)>=0)
                                        originalValue =  originalValue.replace(keyElement.searchString,  keyElement.operand) ;
                                        break;
                                } // switch
                            } // if
                    }) ;// forEach
                    return originalValue ;
                    },
            deepCopy: function(src, dest, modifyList=null){
                        if (src){
                            var objectValues = Object.values(src);
                            // small 'variance' from the recursion where the initial check whether the top level object is a JSON object or array
                            if (Array.isArray(src) ) {
                                for (var arrayKey=0; arrayKey < objectValues.length;arrayKey++) {
                                    if (typeof(objectValues[arrayKey]) =="object") { // array element is an object 
                                    dest.push(new Object());
                                    JSObjects.API.deepCopy(objectValues[arrayKey],dest[arrayKey], modifyList);
                                   }
                                   else { // array element is a primitive    
                                     dest.push(objectValues[arrayKey]);
                                   } 
                                 } 
                            } // top level element is an array
                        else if (typeof(src)=="object" ) {
                            let keyList = Object.keys(src);
                            let valueList = Object.values(src);
                            if (keyList ) { // the object has keys
                                for (let kIndex=0; kIndex < keyList.length;kIndex++){
                                    var destKey = keyList[kIndex];
                                    if (Array.isArray(valueList[kIndex])){ // element is an array 
                                        dest[destKey] = [];
                                        for (var srr=0; srr < valueList[kIndex].length;srr++){
                                            if (typeof(valueList[kIndex][srr]) =="object"){
                                                dest[destKey].push(new Object());
                                                JSObjects.API.deepCopy(valueList[kIndex][srr],dest[destKey][srr],modifyList);
                                            }
                                            else { // simple array  
                                            //    dest[destKey].push(valueList[kIndex][srr]);
                                            dest[destKey].push(modifyList? 
                                                               JSObjects.API.keyModify(dest[destKey],destKey, valueList[kIndex][srr], modifyList ):
                                                               valueList[kIndex][srr]);
                                            }
                                        } // for 
                                    } // isArray
                                    else if (typeof(valueList[kIndex])=="object"  ){ // element is an object 
                                        dest[destKey] = {};
                                        JSObjects.API.deepCopy(valueList[kIndex],dest[destKey],modifyList)
                                    }
                                    else {
                                        dest[destKey] = modifyList? 
                                                               JSObjects.API.keyModify(dest[destKey],destKey, valueList[kIndex], modifyList ):
                                                                valueList[kIndex];
                                    }
                                }// for 
                            } // ... if keylist
                        } // .. src is object
                        else {
                            dest = src ; // 
                          }
                        } // if src
                     } // function deepCopy

    } // JSObjects API
   
    JSObjects.init = function()
    {
        
    }
    JSObjects.init.prototype = JSObjects.API;
    global.JSObjects = JSObjects;
    /* --------------------------------------------------------------------------------------- */
    var DOMManipulator = function(elementName) {
        return new DOMManipulator.init(elementName) ;
    }
    DOMManipulator.API = {
        display: function(displayMode){
                 this.element.style.display  = displayMode;
                 
                 return this;
              },
        text: function(textToAdd, style=null){
                 this.element.textContent  = textToAdd;
                 if (style)
                     this.element.setAttribute("style",style);
                 return this;
              },
        html: function(textToAdd, style=null){
                 this.element.innerHTML  = textToAdd;
                 if (style)
                     this.element.setAttribute("style",style);
                 return this;
              },
        background: function(backgroundStyle, override=false ){
            
                let addStyle= "background-color:" + backgroundStyle ;
                if (!override) { 
                    let existStyle = this.element.getAttribute("style");
                     addStyle = existStyle +  ";"  + addStyle ;
                 }
                this.element.setAttribute("style",addStyle);
            return this;
             },
        foreground: function(foreGroundStyle, override=false ){
            
                let addStyle= "color:" + foreGroundStyle ;
                if (!override) { 
                    let existStyle = this.element.getAttribute("style");
                     addStyle = existStyle +  ";"  + addStyle ;
                 }
                this.element.setAttribute("style",addStyle);
            return this;
             },
        border: function(borderStyle, override=false ){
            
                let addStyle= "border:" + borderStyle ;
                if (!override) { 
                    let existStyle = this.element.getAttribute("style");
                     addStyle  = existStyle +  ";"  + addStyle ;
                 }
                this.element.setAttribute("style",addStyle);
            return this;
             },
        fade: function(start=0, end=0, interval=0){
                this.element.style.opacity = start;
                window.setTimeout(function(localElement){
                // this.element.style.opacity = end;
                        return function() { localElement.style.opacity = end; console.log(localElement) };
                }(this.element), interval)  ;  
                return this;
                },
        
        conditionExpressionStyle: function(expression, styleTrue, styleFalse){
                    if (expression == true){
                        this.element.setAttribute("style",styleTrue);
                    }
                    else
                    {
                         this.element.setAttribute("style",styleFalse);
                       
                    }
                        return this;
                    },
        conditionalStyle: function(value, referenceValue, conditionOperator, styleTrue, styleFalse){
                   // WIP because there would be too many use cases
                        return this;
                    }
        
    }
    DOMManipulator.init = function(elementName){
        // assume global is windows
        this.element = document.getElementById(elementName);
        
    }
    DOMManipulator.init.prototype = DOMManipulator.API;
    global.DOMElement = DOMManipulator;
}(window));