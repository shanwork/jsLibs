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
   var copyTo = {} ;m
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
   - textClass(textToAdd, class=null) sets the text of the element, optionally, sets the class
   (below functions:
       override=false, means it appends to existing style,true = override the style)
   - background(backGroundStyle, override=false) sets background color
   - foreground(foreGroundStyle, override=false) sets color
   - border(borderStyle, override=false ) sets border style.  
   - fade(startOpacity, endOpacity, timeInt ) fade in or out based on two opacities, in timeInt ms
   - conditionExpressionStyle(expression, styleTrue, styleFalse) sets style=styleTrue or styleFalse based on condiiton expression
   - conditionExpressionClass(expression, classTrue, classFalse) sets class=classTrue or classFalse based on condiiton expression
   - switchExpressionClass(expressionClassList, append = true) * Not tested yet *
       sets class based on evaluation of each expression in 'expressionClassList', appends the class, else overwrites
        example of expressionClassList = 
        [
           {
               exp: areaZip == 94105,
               className: SFOAreaClass
           },
            {
               exp: material == 'marble',
               className: primeMaterialClass
           }
        ]
   WIP on existing:
      - consolidate xx() and xxClass() API to a single function, making it transparent to the calling code to send a style string or a classname to the (same) function
      - optional override/append apply to all relevant
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
        // this is a util function, 'bypassKey' added for top level arrays with primitives
        // ### TODO 'key' paramter is redundant. remove
        keyModify: function(key,keyName, originalValue, modifyList, bypassKey=false ) {
                      let returnValue = originalValue;
                      
                      modifyList.forEach(function (keyElement){
                            if (keyElement.key== keyName || bypassKey==true){
                                switch(keyElement.operation){
                                    case '+' : originalValue  += parseFloat(keyElement.operand);
                                        break;
                                    case '-' :  originalValue  -= parseFloat(keyElement.operand);
                                        break;
                                    case '*' :  originalValue  *= parseFloat(keyElement.operand);
                                        break;
                                    case '/' :  originalValue  /= parseFloat(keyElement.operand);
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
                        //        console.log(Object.keys(src));
                                for (var arrayKey=0; arrayKey < objectValues.length;arrayKey++) {
                                    if (typeof(objectValues[arrayKey]) =="object") { // array element is an object 
                                    dest.push(new Object());
                                    JSObjects.API.deepCopy(objectValues[arrayKey],dest[arrayKey], modifyList);
                                   }
                                   else { // array element is a primitive    
                             //        dest.push(objectValues[arrayKey]);
                                     dest.push(   modifyList? 
                                                               JSObjects.API.keyModify('na','na', objectValues[arrayKey], modifyList,true ):
                                                               objectValues[arrayKey]);/**/
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
                     } ,// function deepCopy
        deepModify: function(src,  modifyList ){
                        if (src){
                            var objectValues = Object.values(src);
                            // small 'variance' from the recursion where the initial check whether the top level object is a JSON object or array
                            if (Array.isArray(src) ) {
                                for (var arrayKey=0; arrayKey < objectValues.length;arrayKey++) {
                                    if (typeof(objectValues[arrayKey]) =="object") { // array element is an object 
                                       JSObjects.API.deepModify(objectValues[arrayKey] , modifyList);
                                   }
                                   else { // array element is a primitive   
                                    //   console.log(objectValues[arrayKey]);
                                    // assigning objectValues[arrayKey] doesnt seem to work, need to figure out why
                                    // workimg directly with the array
                                     src[arrayKey] = JSObjects.API.keyModify('na','na', objectValues[arrayKey],                                              modifyList, true );
                                    //    console.log(objectValues[arrayKey]);
                                    // console.log(src);
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
                                        for (var srr=0; srr < valueList[kIndex].length;srr++){
                                            if (typeof(valueList[kIndex][srr]) =="object"){
                                                JSObjects.API.deepModify(valueList[kIndex][srr], modifyList);
                                            }
                                            else { // simple array  
                                             //   console.log('nested array',valueList[kIndex]);
                                             //   console.log('nested array element',valueList[kIndex][srr]);
                                               valueList[kIndex][srr]=
                                                   JSObjects.API.keyModify('na',destKey, valueList[kIndex][srr], modifyList ) ;
                                             //console.log('nested array',valueList[kIndex]);
                                             //    console.log('nested array element',valueList[kIndex][srr]);
                                               }
                                        } // for 
                                    } // isArray
                                    else if (typeof(valueList[kIndex])=="object"  ){ // element is an object 
                                        JSObjects.API.deepModify(valueList[kIndex],modifyList)
                                    }
                                    else {
                                           console.log('nested array element',valueList[kIndex]);
                                        valueList[kIndex] = JSObjects.API.keyModify('na',destKey, valueList[kIndex], modifyList );
                                       console.log('nested array element',valueList[kIndex]);
                                        console.log('nested array',valueList);
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
        textClass: function(textToAdd, className=null){
                this.element.textContent  = textToAdd;
                 if (className)
                     this.element.className = className;
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
      fadeSync: function(start=0, end=0, interval=0, callback=null){
               this.element.style.opacity = start;
               let timeoutFunc = function(   end, callback){
                   if (element && element.style)
                      element.style.opacity = end;
                   if (callback) callback();
                   console.log('callback');
               }
           //    callback.bind(this.element);
               let a = 0;
          window.element = this.element;
                window.setTimeout( timeoutFunc( end, callback)  , interval)  ;  
                return this;
                },
        
       fade: function(start=0, end=0, interval=0, callback=null){
                this.element.style.opacity = start;
                window.setTimeout(function(localElement, returnFunc){
                // this.element.style.opacity = end;
                        return function() { 
                            localElement.style.opacity = end; 
                            console.log('callback calling');
                            if (returnFunc)
                                   returnFunc()  ;
                        };
                }(this.element,callback), interval)  ;  
                return this;
                },
        /****
        Transition functions.. These functions take two domElements, hide the first and show the second
        - domElement1 is by default 'this'
        - domElement2 is the destination
        - iterations is an array of opacity-timeout objects, start and end opacity, self explanatory. For proper sequencing the 
          opacity values across the array should be in order. see example
        e.g. [   { start:1.0,  end:0.7, timout:200  }, { start:0.7,  end:0.3,timout:300 },, { start:0.3,  end:0.0,timout:400 }]
        Notes, some of which may be obvious, but mentioning all the same
        1. Typically used for two overlapping html elements, where one transitions out an the other comes in
        2. Both elements style should preferably have position as absolute, with the same boxing values
        
        */
        transitionFadeSequential: function(domElement2, iterations, index, callback,domElement1=this, index2=iterations.length-1){
                                    // console.log(callback);
                                    // console.log(  iterations[index], index);
                                    if (index < iterations.length){
                                        
                                        domElement1.fade(iterations[index].start, iterations[index].end,  iterations[index].timout, function(){
                                        domElement1.transitionFadeSequential(domElement2, iterations, index,callback) ;
                                        });
                                        index++;
                                    }
                                    else if (index2 >=0) {
                                        domElement2.display('block');
                                        
                                        while (index2 >=0){
                                            domElement2.fade(iterations[index2].end, iterations[index2].start,  iterations[index2].timout, function(){
                                                
                                            } );
                                          //  domElement2.transitionFadeSequential(null, iterations, index2,callback) ;
                                            index2--;
                                        }
                                        if (callback) 
                                            callback() ;
                                    }
                                    return this;
                                },
        transitionFadeParallel: function( domElement2, iterations,  index,  callback,domElement1=this){
                                    //console.log(callback,domElement1);
                                    // console.log(  iterations[index], index);
                                if (domElement2)
                                    domElement1.nextElement = domElement2;
                                if (index < iterations.length){
                                        domElement1.fade(iterations[index].start, iterations[index].end,  iterations[index].timout, function(){
                                            if(domElement1.nextElement) {
                                                let index2 = iterations.length - index -1;
                                                if (index2 >=0 ){
                                                    domElement1.nextElement.display('block');
                                                    domElement1.nextElement.fade(iterations[index2].end, iterations[index2].start,  iterations[index2].timout);
                                                }
                                            }   
                                        domElement1.transitionFadeParallel( domElement2, iterations,  index,  callback,domElement1) ;
                                        });
                                    index++;
                                }
                                else {
                                    if (callback) callback() ;
                                } 
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
        conditionExpressionClass: function(expression, classTrue, classFalse=null, append=false){
                    if (expression == true){
                       this.element.className += ' ' + classTrue;
                    }
                    else if (classFalse)
                    {
                         this.element.className = classFalse;
                       
                    }
                        return this;
                    },
        /* example of expressionClassList = 
        [
           {
               exp: areaZip == 94105,
               className: SFOAreaClass
           },
            {
               exp: material == 'marble',
               className: primeMaterialClass
           }
        ]*/
        // WIP
        switchExpressionClass: function(expressionClassList, append = true){
                   expressionClassList.forEach(function(expressionClasspair){
                       if (expressionClasspair.exp == true && element.className){
                           element.className += " " + expressionClasspair.className;
                       }
                       else  {
                                element.className  = expressionClasspair.className;
                       }
                           })
                       
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